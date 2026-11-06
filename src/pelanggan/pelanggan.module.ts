import { Module } from '@nestjs/common';
import { PelangganController } from './pelanggan.controller';
import { PelangganService } from './pelanggan.service';

@Module({
  controllers: [PelangganController],
  providers: [PelangganService]
})
export class PelangganModule {}
