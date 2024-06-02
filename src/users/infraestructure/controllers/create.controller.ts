import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';

import { UserUseCase } from '../../../users/application/user.useCases';
import { UserDTO } from '../../../auth/application/dto/auth.dto';
import { AuthGuard } from '../../../auth/application/guards/auth.guard';
import { PublicAccess } from '../../../auth/application/decorators/public.decorator';
import { Roles } from '../../../auth/application/decorators/roles.decortor';
import { RolesGuard } from '../../../auth/application/guards/roles.guard';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { createUser } from '../../../config/swagger/examples';

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
  @ApiBody({ type: UserDTO, examples: createUser })
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
