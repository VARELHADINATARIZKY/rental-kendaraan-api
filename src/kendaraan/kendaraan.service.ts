
import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateKendaraanDto } from './dto/create-kendaraan.dto';
import { UpdateKendaraanDto } from './dto/update-kendaraan.dto';

@Injectable()
export class KendaraanService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateKendaraanDto) {
    const platAda = await this.prisma.kendaraan.findUnique({
      where: { platNomor: data.platNomor },
    });

    if (platAda) {
      throw new ConflictException('Plat nomor sudah terdaftar');
    }

    return this.prisma.kendaraan.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.kendaraan.findMany({
      orderBy: { id: 'desc' },
    });
  }

  async findOne(id: number) {
    const kendaraan = await this.prisma.kendaraan.findUnique({
      where: { id },
    });

    if (!kendaraan) {
      throw new NotFoundException('Kendaraan tidak ditemukan');
    }

    return kendaraan;
  }

  async update(id: number, data: UpdateKendaraanDto) {
    await this.findOne(id);

    if (data.platNomor) {
      const platAda = await this.prisma.kendaraan.findUnique({
        where: { platNomor: data.platNomor },
      });

      if (platAda && platAda.id !== id) {
        throw new ConflictException('Plat nomor sudah digunakan');
      }
    }

    return this.prisma.kendaraan.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    const kendaraan = await this.prisma.kendaraan.findUnique({
      where: { id },
      include: {
        penyewaan: true,
      },
    });

    if (!kendaraan) {
      throw new NotFoundException('Kendaraan tidak ditemukan');
    }

    if (kendaraan.penyewaan.length > 0) {
      throw new BadRequestException(
        'Kendaraan tidak dapat dihapus karena masih memiliki data penyewaan',
      );
    }

    return this.prisma.kendaraan.delete({
      where: { id },
    });
  }
}
