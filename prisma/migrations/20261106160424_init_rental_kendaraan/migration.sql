-- CreateTable
CREATE TABLE `Pelanggan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `noHp` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Pelanggan_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kendaraan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `namaKendaraan` VARCHAR(191) NOT NULL,
    `jenis` VARCHAR(191) NOT NULL,
    `merk` VARCHAR(191) NOT NULL,
    `platNomor` VARCHAR(191) NOT NULL,
    `tahun` INTEGER NOT NULL,
    `hargaSewa` DECIMAL(12, 2) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'tersedia',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Kendaraan_platNomor_key`(`platNomor`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Penyewaan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pelangganId` INTEGER NOT NULL,
    `kendaraanId` INTEGER NOT NULL,
    `tanggalMulai` DATETIME(3) NOT NULL,
    `tanggalSelesai` DATETIME(3) NOT NULL,
    `totalBiaya` DECIMAL(12, 2) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'menunggu',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Penyewaan` ADD CONSTRAINT `Penyewaan_pelangganId_fkey` FOREIGN KEY (`pelangganId`) REFERENCES `Pelanggan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Penyewaan` ADD CONSTRAINT `Penyewaan_kendaraanId_fkey` FOREIGN KEY (`kendaraanId`) REFERENCES `Kendaraan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
