import { ROLES } from 'src/config/constants';
import { UserEntity, UserEntityDT0 } from './user.entity';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';
import { configuration } from 'src/config/configuration';

export class UserValue implements UserEntity {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  username: string;
  password: string;
  role: ROLES;

  constructor(user: UserEntityDT0) {
    (this.id = user.id),
      (this.firstName = user.firstName),
      (this.lastName = user.lastName),
      (this.age = user.age),
      (this.email = user.email),
      (this.username = user.username),
      (this.password = user.password),
      (this.role = user.role);
  }
}
