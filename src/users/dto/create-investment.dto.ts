import { IsNotEmpty, IsDate, IsNumber, IsPositive, IsMongoId, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInvestmentDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsMongoId()
  readonly user: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsMongoId()
  readonly instrument_type: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly amount: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly purchase_price: number;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  readonly purchase_date: Date;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  readonly created_at: Date;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  readonly updated_at: Date;
}
