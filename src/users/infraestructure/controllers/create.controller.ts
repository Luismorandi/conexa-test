import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { UserUseCase } from 'src/users/application/user.useCases';
import { UserDTO } from 'src/auth/application/dto/auth.dto';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserUseCase) {}

  @Post('create')
  async create(@Body() body: UserDTO) {
    try {
      return await this.userService.createUser(body);
    } catch (err) {
      throw new HttpException(
        `error create user : ${err}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
