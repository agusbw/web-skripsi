-- CreateTable
CREATE TABLE `admin` (
    `id` VARCHAR(255) NOT NULL,
    `nama` VARCHAR(255) NOT NULL DEFAULT 'Admin',
    `jabatan` VARCHAR(255) NOT NULL DEFAULT 'Admin',
    `id_user` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `admin_id_user_key`(`id_user`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `username` VARCHAR(25) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('WARGA', 'ADMIN') NOT NULL DEFAULT 'WARGA',

    UNIQUE INDEX `user_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `warga` (
    `id` VARCHAR(255) NOT NULL,
    `nama` VARCHAR(255) NOT NULL,
    `alamat` VARCHAR(255) NOT NULL,
    `agama` ENUM('ISLAM', 'PROTESTAN', 'KATOLIK', 'HINDU', 'BUDHA', 'KONGHUCU') NOT NULL,
    `kewarganegaraan` VARCHAR(255) NOT NULL,
    `nik` VARCHAR(255) NOT NULL,
    `no_telp` VARCHAR(255) NOT NULL,
    `no_wa` VARCHAR(255) NULL,
    `pekerjaan` VARCHAR(255) NOT NULL,
    `tanggal_lahir` DATETIME(3) NOT NULL,
    `tempat_lahir` VARCHAR(255) NOT NULL,
    `jenis_kelamin` BOOLEAN NOT NULL,
    `status_perkawinan` ENUM('KAWIN', 'BELUM_KAWIN', 'CERAI_HIDUP', 'CERAI_MATI') NOT NULL,
    `id_user` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `warga_id_user_key`(`id_user`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `admin` ADD CONSTRAINT `admin_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `warga` ADD CONSTRAINT `warga_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
