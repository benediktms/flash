import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { withTRPC } from '@trpc/next';
import { AppRouter } from '@/server/router';
import { loggerLink } from '@trpc/client/links/loggerLink';
import { httpBatchLink } from '@trpc/client/links/httpBatchLink';
import { SSRContext } from '@/lib/trpc';
import superjson from 'superjson';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
const getBaseUrl = () => {
  // Browser should use current path
  if (typeof window !== 'undefined') return '';
  if (process.browser) return '';

  // SSR should use vercel url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;

  // dev SSR should use localhost
  return `http://localhost:${process.env.PORT ?? 3000}`;
};

export default withTRPC<AppRouter>({
  config() {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${getBaseUrl()}/api/trpc`;

    return {
      url,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
      /**
       * @link https://trpc.io/docs/data-transformers
       */
      transformer: superjson,
      links: [
        // adds pretty logs to your console in development and logs errors in production
        loggerLink({
          enabled: opts =>
            process.env.NODE_ENV === 'development' ||
            (opts.direction === 'down' && opts.result instanceof Error),
        }),
        httpBatchLink({
          url,
        }),
      ],
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: true,
  /**
   * Set headers or status code when doing SSR
   */ responseMeta(opts) {
    const ctx = opts.ctx as SSRContext;

    if (ctx.status) {
      // If HTTP status set, propagate that
      return {
        status: ctx.status,
      };
    }

    const error = opts.clientErrors[0];
    if (error) {
      // Propagate http first error from API calls
      return {
        status: error.data?.httpStatus ?? 500,
      };
    }
    // For app caching with SSR see https://trpc.io/docs/caching
    return {};
  },
})(MyApp);
