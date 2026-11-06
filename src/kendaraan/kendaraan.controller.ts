import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

import { KendaraanService } from './kendaraan.service';
import { CreateKendaraanDto } from './dto/create-kendaraan.dto';
import { UpdateKendaraanDto } from './dto/update-kendaraan.dto';

@Controller('kendaraan')
export class KendaraanController {
  constructor(private readonly kendaraanService: KendaraanService) {}

  @Post()
  create(@Body() data: CreateKendaraanDto) {
    return this.kendaraanService.create(data);
  }

  @Get()
  findAll() {
    return this.kendaraanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.kendaraanService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateKendaraanDto,
  ) {
    return this.kendaraanService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.kendaraanService.remove(id);
  }
}