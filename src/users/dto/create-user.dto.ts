import { IsString, IsNotEmpty, IsEmail, IsDate, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Nombre del usuario' })
  name: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: 'Email del usuario' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Password del usuario' })
  password: string;

  @IsDate()
  @IsOptional()
  @ApiProperty({ description: 'Fecha de creacion del usuario' })
  created_at: Date;

  @IsDate()
  @IsOptional()
  @ApiProperty({ description: 'Fecha de actualizacion del usuario' })
  updated_at: Date;
}
