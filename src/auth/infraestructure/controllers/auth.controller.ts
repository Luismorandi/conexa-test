import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthUseCase } from 'src/auth/application/auth.useCase';
import { AuthDTO } from '../dto/auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthUseCase) {}
  @Post('login')
  async login(@Body() { email, password }: AuthDTO) {
    const userValidate = await this.authService.validateUser(email, password);

    if (!userValidate) {
      throw new UnauthorizedException('Data not valid');
    }

    const jwt = await this.authService.generateJWT(userValidate);

    return jwt;
  }
}
