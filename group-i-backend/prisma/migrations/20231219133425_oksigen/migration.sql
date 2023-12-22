/*
  Warnings:

  - You are about to drop the column `timeId` on the `polution` table. All the data in the column will be lost.
  - You are about to drop the column `isPremium` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `healthCost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `time` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `caseRespiratory` to the `polution` table without a default value. This is not possible if the table is not empty.
  - Added the required column `costverifRespiratory` to the `polution` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `polution` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "healthCost" DROP CONSTRAINT "healthCost_polutionId_fkey";

-- DropForeignKey
ALTER TABLE "healthCost" DROP CONSTRAINT "healthCost_timeId_fkey";

-- DropForeignKey
ALTER TABLE "polution" DROP CONSTRAINT "polution_timeId_fkey";

-- AlterTable
ALTER TABLE "polution" DROP COLUMN "timeId",
ADD COLUMN     "caseRespiratory" INTEGER NOT NULL,
ADD COLUMN     "costverifRespiratory" INTEGER NOT NULL,
ADD COLUMN     "time" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "isPremium";

-- DropTable
DROP TABLE "healthCost";

-- DropTable
DROP TABLE "time";

-- CreateTable
CREATE TABLE "transaction" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "billCode" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "token" TEXT NOT NULL DEFAULT '',
    "snapUrl" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "polution" ADD CONSTRAINT "polution_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
