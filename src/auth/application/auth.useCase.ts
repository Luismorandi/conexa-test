import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserUseCase } from 'src/users/application/user.useCases';
import { UserEntity } from 'src/users/domain/user.entity';
import { AuthResponse, PayloadToken } from '../domain/auth.entity';
import { UserDTO } from './dto/auth.dto';

@Injectable()
export class AuthUseCase {
  constructor(private readonly userUseCase: UserUseCase) {}

  public async validateUser(email: string, password: string) {
    const userByEmail = await this.userUseCase.findByEmail(email);

    if (userByEmail) {
      const match = await bcrypt.compare(password, userByEmail.password);
      if (match) return userByEmail;
    }

    return null;
  }

  public signJWT({
    payload,
    secret,
    expires,
  }: {
    payload: jwt.JwtPayload;
    secret: string;
    expires: number | string;
  }): string {
    return jwt.sign(payload, secret, { expiresIn: expires });
  }

  public async generateJWT(user: UserDTO): Promise<AuthResponse> {
    const getUser = await this.userUseCase.findById(user.id);

    const payload: PayloadToken = {
      role: getUser.role,
      sub: getUser.id,
    };

    return {
      accessToken: this.signJWT({
        payload,
        secret: process.env.JWT_SECRET,
        expires: '1h',
      }),
      user,
    };
  }
}
