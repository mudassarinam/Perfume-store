ALTER TABLE `customers`
    ADD COLUMN `firstName` VARCHAR(191) NULL,
    ADD COLUMN `lastName` VARCHAR(191) NULL,
    ADD COLUMN `fullName` VARCHAR(191) NULL,
    ADD COLUMN `status` ENUM('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE',
    ADD COLUMN `notes` TEXT NULL,
    ADD COLUMN `totalOrders` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `totalSpent` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    ADD COLUMN `lastOrderDate` DATETIME(3) NULL;

UPDATE `customers`
SET
    `firstName` = COALESCE(NULLIF(SUBSTRING_INDEX(`name`, ' ', 1), ''), 'Customer'),
    `lastName` = CASE WHEN INSTR(`name`, ' ') > 0 THEN TRIM(SUBSTRING(`name`, INSTR(`name`, ' ') + 1)) ELSE '' END,
    `fullName` = `name`,
    `phone` = COALESCE(`phone`, '');

ALTER TABLE `customers`
    MODIFY `firstName` VARCHAR(191) NOT NULL,
    MODIFY `lastName` VARCHAR(191) NOT NULL,
    MODIFY `fullName` VARCHAR(191) NOT NULL,
    MODIFY `phone` VARCHAR(20) NOT NULL,
    DROP COLUMN `name`;

CREATE INDEX `customers_fullName_idx` ON `customers`(`fullName`);
CREATE INDEX `customers_status_idx` ON `customers`(`status`);
