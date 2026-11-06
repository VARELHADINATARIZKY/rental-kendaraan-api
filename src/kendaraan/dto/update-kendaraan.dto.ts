import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsNumber,
  IsOptional,
  IsIn,
  Min,
} from 'class-validator';

export class UpdateKendaraanDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  namaKendaraan?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  jenis?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  merk?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  platNomor?: string;

  @IsOptional()
  @IsInt()
  @Min(1900)
  tahun?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  hargaSewa?: number;

  @IsOptional()
  @IsIn(['tersedia', 'disewa', 'perawatan'])
  status?: string;
}