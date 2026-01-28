/*
  Warnings:

  - Added the required column `name` to the `payment_promise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "payment_promise" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "payment_date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'EN_PROCESO';
