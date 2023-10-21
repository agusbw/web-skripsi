/*
  Warnings:

  - You are about to drop the `admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `warga` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `admin` DROP FOREIGN KEY `admin_id_user_fkey`;

-- DropForeignKey
ALTER TABLE `warga` DROP FOREIGN KEY `warga_id_user_fkey`;

-- DropTable
DROP TABLE `admin`;

-- DropTable
DROP TABLE `user`;

-- DropTable
DROP TABLE `warga`;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `username` VARCHAR(25) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('WARGA', 'ADMIN') NOT NULL DEFAULT 'WARGA',

    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Penandatangan` (
    `id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(255) NOT NULL,
    `jabatan` VARCHAR(255) NOT NULL,
    `alamat` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Warga` (
    `id` VARCHAR(255) NOT NULL,
    `nik` VARCHAR(255) NOT NULL,
    `nama` VARCHAR(255) NOT NULL,
    `alamat` VARCHAR(255) NOT NULL,
    `agama` ENUM('ISLAM', 'PROTESTAN', 'KATOLIK', 'HINDU', 'BUDHA', 'KONGHUCU') NOT NULL,
    `kewarganegaraan` VARCHAR(255) NOT NULL,
    `no_telp` VARCHAR(255) NOT NULL,
    `pekerjaan` VARCHAR(255) NOT NULL,
    `tanggal_lahir` DATETIME(3) NOT NULL,
    `tempat_lahir` VARCHAR(255) NOT NULL,
    `jenis_kelamin` BOOLEAN NOT NULL,
    `status_perkawinan` ENUM('KAWIN', 'BELUM_KAWIN', 'CERAI_HIDUP', 'CERAI_MATI') NOT NULL,
    `id_user` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Warga_id_user_key`(`id_user`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KategoriSurat` (
    `id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Surat` (
    `id` VARCHAR(191) NOT NULL,
    `no_surat` VARCHAR(255) NOT NULL,
    `no_kk` VARCHAR(255) NULL,
    `keperluan` VARCHAR(255) NOT NULL,
    `status` ENUM('PENDING', 'DITOLAK', 'SELESAI') NOT NULL DEFAULT 'PENDING',
    `nik` VARCHAR(255) NOT NULL,
    `nama` VARCHAR(255) NOT NULL,
    `alamat` VARCHAR(255) NOT NULL,
    `agama` ENUM('ISLAM', 'PROTESTAN', 'KATOLIK', 'HINDU', 'BUDHA', 'KONGHUCU') NOT NULL,
    `kewarganegaraan` VARCHAR(255) NOT NULL,
    `pekerjaan` VARCHAR(255) NOT NULL,
    `tanggal_lahir` DATETIME(3) NOT NULL,
    `tempat_lahir` VARCHAR(255) NOT NULL,
    `jenis_kelamin` BOOLEAN NOT NULL,
    `status_perkawinan` ENUM('KAWIN', 'BELUM_KAWIN', 'CERAI_HIDUP', 'CERAI_MATI') NOT NULL,
    `url` VARCHAR(255) NULL,
    `domisili` VARCHAR(255) NULL,
    `keterangan_tambahan` VARCHAR(255) NULL,
    `id_penandatangan` VARCHAR(255) NOT NULL,
    `id_kategori_surat` VARCHAR(255) NOT NULL,
    `id_warga` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Warga` ADD CONSTRAINT `Warga_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Surat` ADD CONSTRAINT `Surat_id_penandatangan_fkey` FOREIGN KEY (`id_penandatangan`) REFERENCES `Penandatangan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Surat` ADD CONSTRAINT `Surat_id_kategori_surat_fkey` FOREIGN KEY (`id_kategori_surat`) REFERENCES `KategoriSurat`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Surat` ADD CONSTRAINT `Surat_id_warga_fkey` FOREIGN KEY (`id_warga`) REFERENCES `Warga`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
