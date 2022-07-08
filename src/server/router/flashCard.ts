import { createFlashCardSchema } from '../../validators/createFlashCard';
import { createRouter } from '../context';

export const flashCardRouter = createRouter()
  .mutation('create', {
    input: createFlashCardSchema,
    async resolve({ input, ctx }) {
      const flashCard = await ctx.prisma.flashCard.create({
        data: input,
      });

      return flashCard;
    },
  })
  .query('all', {
    async resolve({ ctx }) {
      return await ctx.prisma.flashCard.findMany();
    },
  });
