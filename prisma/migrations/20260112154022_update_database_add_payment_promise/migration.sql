/*
  Warnings:

  - You are about to drop the column `is_promise` on the `Payment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "is_promise";

-- CreateTable
CREATE TABLE "payment_promise" (
    "id" TEXT NOT NULL,
    "valid_until" TIMESTAMP(3) NOT NULL,
    "contract_id" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "bank" TEXT NOT NULL,
    "transaction_code" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payment_promise_pkey" PRIMARY KEY ("id")
);
