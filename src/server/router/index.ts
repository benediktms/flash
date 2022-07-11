import { createRouter } from '../context';
import superjson from 'superjson';
import { userRouter } from './user';
import { authRouter } from './auth';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('auth.', authRouter)
  .merge('user.', userRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
