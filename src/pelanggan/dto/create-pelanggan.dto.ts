import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreatePelangganDto {
  @IsString()
  @IsNotEmpty()
  nama: string;

  @IsEmail()
  email: string;

  @IsString()
  @Matches(/^[0-9+\- ]{10,15}$/, {
    message: 'Nomor HP harus terdiri dari 10 sampai 15 digit',
  })
  noHp: string;

  @IsString()
  @IsNotEmpty()
  alamat: string;
}