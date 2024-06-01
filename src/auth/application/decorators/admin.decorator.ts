import { SetMetadata } from '@nestjs/common';
import { ADMIN_KEY, ROLES } from 'src/config/constants';

export const AdminAccess = () => SetMetadata(ADMIN_KEY, ROLES.ADMIN);
