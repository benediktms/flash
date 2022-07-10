import { signUpSchema } from '../../validators/signUp';
import { createRouter } from '../context';
import { hash } from 'argon2';
import { SALT_LENGTH, SALT_ROUNDS } from '../constants';
import { randomBytes } from 'crypto';

export const userRouter = createRouter().mutation('signUp', {
  input: signUpSchema,
  async resolve({ ctx, input }) {
    const existing = await ctx.prisma.user.findUnique({
      where: { email: input.email },
    });

    if (existing) {
      // Error should not give any information on whether the email is in use for security reasons
      throw new Error('Sign up failed');
    }

    const salt = randomBytes(SALT_ROUNDS);
    const passwordHash = await hash(input.password, {
      salt,
      saltLength: SALT_LENGTH,
    });

    const user = await ctx.prisma.user.create({
      data: { ...input, password: passwordHash },
    });

    return user;
  },
});
