/*
  Warnings:

  - You are about to alter the column `jenis_kelamin` on the `warga` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(2))`.

*/
-- AlterTable
ALTER TABLE `warga` MODIFY `jenis_kelamin` ENUM('MALE', 'FEMALE') NOT NULL;
