/*
  Warnings:

  - Added the required column `name` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('APROBADO', 'RECHAZADO', 'EN_PROCESO');

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'EN_PROCESO';
