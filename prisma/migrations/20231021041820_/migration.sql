-- DropForeignKey
ALTER TABLE `surat` DROP FOREIGN KEY `Surat_id_kategori_surat_fkey`;

-- DropForeignKey
ALTER TABLE `surat` DROP FOREIGN KEY `Surat_id_penandatangan_fkey`;

-- DropForeignKey
ALTER TABLE `surat` DROP FOREIGN KEY `Surat_id_warga_fkey`;

-- AddForeignKey
ALTER TABLE `Surat` ADD CONSTRAINT `Surat_id_penandatangan_fkey` FOREIGN KEY (`id_penandatangan`) REFERENCES `Penandatangan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Surat` ADD CONSTRAINT `Surat_id_kategori_surat_fkey` FOREIGN KEY (`id_kategori_surat`) REFERENCES `KategoriSurat`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Surat` ADD CONSTRAINT `Surat_id_warga_fkey` FOREIGN KEY (`id_warga`) REFERENCES `Warga`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
