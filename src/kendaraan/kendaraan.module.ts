import { Module } from '@nestjs/common';
import { KendaraanController } from './kendaraan.controller';
import { KendaraanService } from './kendaraan.service';

@Module({
  controllers: [KendaraanController],
  providers: [KendaraanService]
})
export class KendaraanModule {}
