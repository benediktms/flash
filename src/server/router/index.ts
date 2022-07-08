import { createRouter } from '../context';
import superjson from 'superjson';
import { flashCardRouter } from './flashCard';
import { setRouter } from './set';
import { userRouter } from './user';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('flashCard.', flashCardRouter)
  .merge('set.', setRouter)
  .merge('user.', userRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
