
import { Module } from '@nestjs/common';
import { PenyewaanController } from './penyewaan.controller';
import { PenyewaanService } from './penyewaan.service';
import { PenyewaanResolver } from './penyewaan.resolver';

@Module({
  controllers: [PenyewaanController],
  providers: [PenyewaanService, PenyewaanResolver],
})
export class PenyewaanModule {}
