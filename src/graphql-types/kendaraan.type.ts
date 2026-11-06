
import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class KendaraanType {
  @Field(() => Int)
  id: number;

  @Field()
  namaKendaraan: string;

  @Field()
  jenis: string;

  @Field()
  merk: string;

  @Field()
  platNomor: string;

  @Field(() => Int)
  tahun: number;

  @Field(() => Float)
  hargaSewa: number;

  @Field()
  status: string;
}
