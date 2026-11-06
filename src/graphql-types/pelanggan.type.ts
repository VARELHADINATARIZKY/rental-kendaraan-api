
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class PelangganType {
  @Field(() => Int)
  id: number;

  @Field()
  nama: string;

  @Field()
  email: string;

  @Field()
  noHp: string;

  @Field()
  alamat: string;
}
