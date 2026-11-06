
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreatePelangganDto } from './dto/create-pelanggan.dto';

@Injectable()
export class PelangganService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreatePelangganDto) {
    const existing = await this.prisma.pelanggan.findUnique({
      where: { email: data.email },
    });

    if (existing) {
      throw new BadRequestException('Email pelanggan sudah terdaftar');
    }

    return this.prisma.pelanggan.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.pelanggan.findMany({
      orderBy: { id: 'asc' },
    });
  }

  async update(id: number, data: CreatePelangganDto) {
    const pelanggan = await this.prisma.pelanggan.findUnique({
      where: { id },
    });

    if (!pelanggan) {
      throw new NotFoundException('Pelanggan tidak ditemukan');
    }

    const emailTerpakai = await this.prisma.pelanggan.findFirst({
      where: {
        email: data.email,
        NOT: { id },
      },
    });

    if (emailTerpakai) {
      throw new BadRequestException('Email sudah digunakan pelanggan lain');
    }

    return this.prisma.pelanggan.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    const pelanggan = await this.prisma.pelanggan.findUnique({
      where: { id },
      include: { penyewaan: true },
    });

    if (!pelanggan) {
      throw new NotFoundException('Pelanggan tidak ditemukan');
    }

    if (pelanggan.penyewaan.length > 0) {
      throw new BadRequestException(
        'Pelanggan tidak dapat dihapus karena masih memiliki data penyewaan',
      );
    }

    return this.prisma.pelanggan.delete({
      where: { id },
    });
  }
}
