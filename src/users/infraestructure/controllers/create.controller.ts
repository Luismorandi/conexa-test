import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';

import { UserUseCase } from 'src/users/application/user.useCases';
import { UserDTO } from 'src/auth/application/dto/auth.dto';
import { AuthGuard } from 'src/auth/application/guards/auth.guard';
import { PublicAccess } from 'src/auth/application/decorators/public.decorator';
import { Roles } from 'src/auth/application/decorators/roles.decortor';
import { RolesGuard } from 'src/auth/application/guards/roles.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('user')
@UseGuards(AuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserUseCase) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @PublicAccess()
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

  @ApiResponse({ status: 200, description: 'Returns all users.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Roles('ADMIN')
  @Get('all')
  async getAll() {
    try {
      return await this.userService.getAll();
    } catch (err) {
      throw new HttpException(
        `error create user : ${err}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
