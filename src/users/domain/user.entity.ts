import { UUID } from 'crypto';
import { ROLES } from 'src/config/constants';

export interface UserEntity {
  id?: string;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  username: string;
  password: string;
  role: ROLES;
}

export interface UserEntityDT0 {
  id?: string;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  username: string;
  password: string;
  role: ROLES;
}

export interface ValidateUserDTO {
  email: string;
  username: string;
}
