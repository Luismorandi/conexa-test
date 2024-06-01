import { SetMetadata } from '@nestjs/common';
import { PUBLIC_KEY } from 'src/config/constants';

export const PublicAccess = () => SetMetadata(PUBLIC_KEY, true);
