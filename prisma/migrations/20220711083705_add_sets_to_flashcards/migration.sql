/*
  Warnings:

  - Made the column `setId` on table `FlashCard` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `userId` to the `Set` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FlashCard" DROP CONSTRAINT "FlashCard_setId_fkey";

-- AlterTable
ALTER TABLE "FlashCard" ALTER COLUMN "setId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Set" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "FlashCard" ADD CONSTRAINT "FlashCard_setId_fkey" FOREIGN KEY ("setId") REFERENCES "Set"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Set" ADD CONSTRAINT "Set_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
