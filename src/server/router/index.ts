import { createRouter } from '../context';
import superjson from 'superjson';
import { userRouter } from './user';
import { authRouter } from './auth';
import { log } from 'next-axiom';

export const appRouter = createRouter()
  .transformer(superjson)
  .middleware(async ({ ctx, path, rawInput, next }) => {
    const req = ctx.req;
    const res = ctx.res;

    const data = {
      request: {
        path,
        url: req?.url,
        body: rawInput,
      },
      response: { status: res?.statusCode },
    };

    log.debug('Request', data);

    return await next();
  })
  .merge('auth.', authRouter)
  .merge('user.', userRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
