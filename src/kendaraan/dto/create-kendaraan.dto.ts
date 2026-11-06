import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsNumber,
  IsOptional,
  IsIn,
  Min,
} from 'class-validator';

export class CreateKendaraanDto {
  @IsString()
  @IsNotEmpty()
  namaKendaraan: string;

  @IsString()
  @IsNotEmpty()
  jenis: string;

  @IsString()
  @IsNotEmpty()
  merk: string;

  @IsString()
  @IsNotEmpty()
  platNomor: string;

  @IsInt()
  @Min(1900)
  tahun: number;

  @IsNumber()
  @Min(1)
  hargaSewa: number;

  @IsOptional()
  @IsIn(['tersedia', 'disewa', 'perawatan'])
  status?: string;
}