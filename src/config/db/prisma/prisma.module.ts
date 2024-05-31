import { Module } from '@nestjs/common';
import { PrismaClientProvider } from './prisma-client.provider';

@Module({
  providers: [PrismaClientProvider],
  exports: [PrismaClientProvider],
})
export class PrismaModule {}
