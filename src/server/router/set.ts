import { z } from 'zod';
import { createRouter } from '../context';

export const setRouter = createRouter().mutation('create', {
  input: z.object({ name: z.string().min(1) }),
  async resolve({ ctx, input }) {
    const set = await ctx.prisma.set.create({
      data: input,
    });

    return set;
  },
});
