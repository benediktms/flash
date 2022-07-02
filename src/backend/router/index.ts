import * as trpc from '@trpc/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';

export const appRouter = trpc
  .router()
  .mutation('create-flashcard', {
    input: z.object({
      question: z.string().min(1),
      answer: z.string().min(1),
    }),
    async resolve({ input }) {
      const flashCard = await prisma.flashCard.create({
        data: input,
      });

      return flashCard;
    },
  })
  .mutation('create-set', {
    input: z.object({ name: z.string().min(1) }),
    async resolve({ input }) {
      const set = await prisma.set.create({
        data: input,
      });

      return set;
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;
