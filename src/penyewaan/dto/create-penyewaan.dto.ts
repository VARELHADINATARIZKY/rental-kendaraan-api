import {
  IsInt,
  IsDateString,
  IsNumber,
  IsOptional,
  IsIn,
  Min,
} from 'class-validator';

export class CreatePenyewaanDto {
  @IsInt()
  @Min(1)
  pelangganId: number;

  @IsInt()
  @Min(1)
  kendaraanId: number;

  @IsDateString()
  tanggalMulai: string;

  @IsDateString()
  tanggalSelesai: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(1)
  totalBiaya: number;

  @IsOptional()
  @IsIn(['menunggu', 'berlangsung', 'selesai', 'dibatalkan'])
  status?: string;
}