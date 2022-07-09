import { PrismaClient } from '@prisma/client';
import { NodeEnvironment } from './environment';

const prismaGlobal = global as typeof global & {
  prisma?: PrismaClient;
};

export const prisma =
  prismaGlobal.prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === NodeEnvironment.Development
        ? ['query', 'error', 'warn']
        : ['error'],
  });

if (process.env.NODE_ENV !== NodeEnvironment.Production) {
  prismaGlobal.prisma = prisma;
}
