import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentailsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/lib/client';
import { verify } from 'argon2';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  // secret: 'secret', // should not be required, uses NEXTAUTH_SECRET if set
  providers: [
    CredentailsProvider({
      name: 'Email & Password',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'Enter your email',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Enter your password',
        },
      },
      async authorize(credentials, _req) {
        if (!credentials?.password) {
          throw new Error('Please enter your password');
        }

        const found = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!found) throw new Error('Login failed');

        const passwordMatch = await verify(
          found.password,
          credentials.password
        );

        if (!passwordMatch) throw new Error('Login failed');

        return { id: found.id, email: found.email };
      },
    }),
  ],
};

export default NextAuth(authOptions);
