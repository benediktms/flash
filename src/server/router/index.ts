import { createRouter } from '../context';
import superjson from 'superjson';
import { flashCardRouter } from './flashCard';
import { setRouter } from './set';
import { userRouter } from './user';
import { authRouter } from './auth';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('auth.', authRouter)
  .merge('user.', userRouter)
  .merge('flashCard.', flashCardRouter)
  .merge('set.', setRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
