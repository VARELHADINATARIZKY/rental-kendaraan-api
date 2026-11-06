
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

import { PrismaModule } from './prisma/prisma.module';
import { PelangganModule } from './pelanggan/pelanggan.module';
import { KendaraanModule } from './kendaraan/kendaraan.module';
import { PenyewaanModule } from './penyewaan/penyewaan.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    PrismaModule,
    PelangganModule,
    KendaraanModule,
    PenyewaanModule,
  ],
})
export class AppModule {}
