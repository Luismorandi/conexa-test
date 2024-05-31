import { SharedTypes } from 'src/config/constants';
import { PrismaService } from './services/prisma.service';

export const PrismaClientProvider = {
  provide: SharedTypes.PRISMA,
  useClass: PrismaService,
};
