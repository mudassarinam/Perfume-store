/*
  Warnings:

  - You are about to drop the column `price` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `subtotal` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `invoiceNo` on the `orders` table. All the data in the column will be lost.
  - The values [COD] on the enum `orders_paymentMethod` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[orderNumber]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `total` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitPrice` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderNumber` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `order_items` DROP FOREIGN KEY `order_items_orderId_fkey`;

-- DropIndex
DROP INDEX `order_items_orderId_productId_key` ON `order_items`;

-- DropIndex
DROP INDEX `orders_invoiceNo_key` ON `orders`;

-- AlterTable
ALTER TABLE `order_items` DROP COLUMN `price`,
    DROP COLUMN `subtotal`,
    ADD COLUMN `discount` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    ADD COLUMN `total` DECIMAL(10, 2) NOT NULL,
    ADD COLUMN `unitPrice` DECIMAL(10, 2) NOT NULL;

-- AlterTable
ALTER TABLE `orders` DROP COLUMN `invoiceNo`,
    ADD COLUMN `notes` TEXT NULL,
    ADD COLUMN `orderNumber` VARCHAR(100) NOT NULL,
    ADD COLUMN `paidAmount` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    MODIFY `status` ENUM('PENDING', 'CONFIRMED', 'PROCESSING', 'DELIVERED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    MODIFY `paymentStatus` ENUM('PENDING', 'PARTIAL', 'PAID', 'REFUNDED') NOT NULL DEFAULT 'PENDING',
    MODIFY `paymentMethod` ENUM('CASH', 'CARD', 'BANK_TRANSFER', 'JAZZCASH', 'EASYPAISA') NULL;

-- CreateIndex
CREATE UNIQUE INDEX `orders_orderNumber_key` ON `orders`(`orderNumber`);

