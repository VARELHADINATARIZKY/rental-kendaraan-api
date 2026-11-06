
import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { GraphQLISODateTime } from '@nestjs/graphql';
import { PelangganType } from './pelanggan.type';
import { KendaraanType } from './kendaraan.type';

@ObjectType()
export class PenyewaanType {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  pelangganId: number;

  @Field(() => Int)
  kendaraanId: number;

  @Field(() => GraphQLISODateTime)
  tanggalMulai: Date;

  @Field(() => GraphQLISODateTime)
  tanggalSelesai: Date;

  @Field(() => Float)
  totalBiaya: number;

  @Field()
  status: string;

  @Field(() => PelangganType)
  pelanggan: PelangganType;

  @Field(() => KendaraanType)
  kendaraan: KendaraanType;
}
