
import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { PenyewaanService } from './penyewaan.service';
import { PenyewaanType } from '../graphql-types/penyewaan.type';

@Resolver(() => PenyewaanType)
export class PenyewaanResolver {
  constructor(
    private readonly penyewaanService: PenyewaanService,
  ) {}

  @Query(() => String, { name: 'pesanGraphQL' })
  pesanGraphQL() {
    return 'GraphQL Rental Kendaraan berhasil dijalankan!';
  }

  @Query(() => [PenyewaanType], { name: 'semuaPenyewaan' })
  semuaPenyewaan() {
    return this.penyewaanService.findAll();
  }

  @Query(() => PenyewaanType, {
    name: 'penyewaanById',
    nullable: true,
  })
  async penyewaanById(@Args('id', { type: () => Int }) id: number) {
    try {
      return await this.penyewaanService.findOne(id);
    } catch {
      return null;
    }
  }
}
