
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreatePenyewaanDto } from './dto/create-penyewaan.dto';

@Injectable()
export class PenyewaanService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreatePenyewaanDto) {
    const tanggalMulai = new Date(data.tanggalMulai);
    const tanggalSelesai = new Date(data.tanggalSelesai);

    if (tanggalSelesai <= tanggalMulai) {
      throw new BadRequestException(
        'Tanggal selesai harus setelah tanggal mulai',
      );
    }

    const pelanggan = await this.prisma.pelanggan.findUnique({
      where: { id: data.pelangganId },
    });

    if (!pelanggan) {
      throw new NotFoundException('Pelanggan tidak ditemukan');
    }

    const kendaraan = await this.prisma.kendaraan.findUnique({
      where: { id: data.kendaraanId },
    });

    if (!kendaraan) {
      throw new NotFoundException('Kendaraan tidak ditemukan');
    }

    if (kendaraan.status !== 'tersedia') {
      throw new ConflictException('Kendaraan sedang tidak tersedia');
    }

    return this.prisma.$transaction(async (tx) => {
      const penyewaan = await tx.penyewaan.create({
        data: {
          pelangganId: data.pelangganId,
          kendaraanId: data.kendaraanId,
          tanggalMulai,
          tanggalSelesai,
          totalBiaya: data.totalBiaya,
          status: data.status ?? 'menunggu',
        },
        include: {
          pelanggan: true,
          kendaraan: true,
        },
      });

      await tx.kendaraan.update({
        where: { id: data.kendaraanId },
        data: { status: 'disewa' },
      });

      return penyewaan;
    });
  }

  async findAll() {
    return this.prisma.penyewaan.findMany({
      include: {
        pelanggan: true,
        kendaraan: true,
      },
      orderBy: { id: 'desc' },
    });
  }

  async findOne(id: number) {
    const penyewaan = await this.prisma.penyewaan.findUnique({
      where: { id },
      include: {
        pelanggan: true,
        kendaraan: true,
      },
    });

    if (!penyewaan) {
      throw new NotFoundException('Data penyewaan tidak ditemukan');
    }

    return penyewaan;
  }

  // UPDATE PENYEWAAN
  async update(id: number, data: CreatePenyewaanDto) {
    const penyewaanLama = await this.findOne(id);

    const tanggalMulai = new Date(data.tanggalMulai);
    const tanggalSelesai = new Date(data.tanggalSelesai);

    if (tanggalSelesai <= tanggalMulai) {
      throw new BadRequestException(
        'Tanggal selesai harus setelah tanggal mulai',
      );
    }

    const pelanggan = await this.prisma.pelanggan.findUnique({
      where: { id: data.pelangganId },
    });

    if (!pelanggan) {
      throw new NotFoundException('Pelanggan tidak ditemukan');
    }

    const kendaraanBaru = await this.prisma.kendaraan.findUnique({
      where: { id: data.kendaraanId },
    });

    if (!kendaraanBaru) {
      throw new NotFoundException('Kendaraan tidak ditemukan');
    }

    const statusBaru = data.status ?? penyewaanLama.status;
    const kendaraanBerubah =
      data.kendaraanId !== penyewaanLama.kendaraanId;

    const kendaraanAktif =
      statusBaru === 'menunggu' || statusBaru === 'berlangsung';

    if (kendaraanBerubah && kendaraanAktif &&
        kendaraanBaru.status !== 'tersedia') {
      throw new ConflictException('Kendaraan sedang tidak tersedia');
    }

    return this.prisma.$transaction(async (tx) => {
      const hasil = await tx.penyewaan.update({
        where: { id },
        data: {
          pelangganId: data.pelangganId,
          kendaraanId: data.kendaraanId,
          tanggalMulai,
          tanggalSelesai,
          totalBiaya: data.totalBiaya,
          status: statusBaru,
        },
        include: {
          pelanggan: true,
          kendaraan: true,
        },
      });

      if (kendaraanBerubah) {
        const penyewaanAktifLama = await tx.penyewaan.count({
          where: {
            kendaraanId: penyewaanLama.kendaraanId,
            status: { in: ['menunggu', 'berlangsung'] },
          },
        });

        if (penyewaanAktifLama === 0) {
          await tx.kendaraan.update({
            where: { id: penyewaanLama.kendaraanId },
            data: { status: 'tersedia' },
          });
        }
      }

      const penyewaanAktifBaru = await tx.penyewaan.count({
        where: {
          kendaraanId: data.kendaraanId,
          status: { in: ['menunggu', 'berlangsung'] },
        },
      });

      await tx.kendaraan.update({
        where: { id: data.kendaraanId },
        data: {
          status: penyewaanAktifBaru > 0 ? 'disewa' : 'tersedia',
        },
      });

      return hasil;
    });
  }

  // DELETE PENYEWAAN
  async remove(id: number) {
    const penyewaan = await this.findOne(id);

    return this.prisma.$transaction(async (tx) => {
      const hasil = await tx.penyewaan.delete({
        where: { id },
      });

      const penyewaanAktif = await tx.penyewaan.count({
        where: {
          kendaraanId: penyewaan.kendaraanId,
          status: { in: ['menunggu', 'berlangsung'] },
        },
      });

      if (penyewaanAktif === 0) {
        await tx.kendaraan.update({
          where: { id: penyewaan.kendaraanId },
          data: { status: 'tersedia' },
        });
      }

      return hasil;
    });
  }
}
