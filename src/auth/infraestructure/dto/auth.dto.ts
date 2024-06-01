import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { AuthBody } from 'src/auth/domain/auth.entity';

export class AuthDTO implements AuthBody {
  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}
