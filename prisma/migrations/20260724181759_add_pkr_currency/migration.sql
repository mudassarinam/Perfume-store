-- AlterTable
ALTER TABLE `settings` MODIFY `currency` ENUM('PKR', 'USD', 'EUR', 'GBP', 'AED') NOT NULL DEFAULT 'USD';

-- AddForeignKey
ALTER TABLE `order_items` ADD CONSTRAINT `order_items_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `orders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
