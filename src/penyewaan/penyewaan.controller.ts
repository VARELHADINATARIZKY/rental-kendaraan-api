
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Put,
  Delete,
} from '@nestjs/common';

import { PenyewaanService } from './penyewaan.service';
import { CreatePenyewaanDto } from './dto/create-penyewaan.dto';

@Controller('penyewaan')
export class PenyewaanController {
  constructor(private readonly penyewaanService: PenyewaanService) {}

  @Post()
  create(@Body() data: CreatePenyewaanDto) {
    return this.penyewaanService.create(data);
  }

  @Get()
  findAll() {
    return this.penyewaanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.penyewaanService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: CreatePenyewaanDto,
  ) {
    return this.penyewaanService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.penyewaanService.remove(id);
  }
}
