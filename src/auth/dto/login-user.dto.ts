import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: 'Email del usuario' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Password del usuario' })
  password: string;
}
