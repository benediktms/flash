import { appRouter } from '@/server/router';
import * as trpcNext from '@trpc/server/adapters/next';
import { createContext } from '@/server/context';

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: createContext,
});
