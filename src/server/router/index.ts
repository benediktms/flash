import { createRouter } from '../context';
import superjson from 'superjson';
import { flashCardRouter } from './flashCard';
import { setRouter } from './set';
import { userRouter } from './user';
import { authRouter } from './auth';
import { logger } from '@/lib/logger';

export const appRouter = createRouter()
  .transformer(superjson)
  .middleware(async ({ ctx, path, next }) => {
    const data = {
      path,
      request: {
        method: ctx.req?.method,
        url: ctx.req?.url,
        body: ctx.req?.body,
      },
      response: {
        status: ctx.res?.statusCode,
      },
    };

    logger.info(data);

    return await next();
  })
  .merge('auth.', authRouter)
  .merge('user.', userRouter)
  .merge('flashCard.', flashCardRouter)
  .merge('set.', setRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
