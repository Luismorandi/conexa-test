import { SharedTypes } from '../../../config/constants';
import { PrismaService } from './services/prisma.service';

export const PrismaClientProvider = {
  provide: SharedTypes.PRISMA,
  useClass: PrismaService,
};
