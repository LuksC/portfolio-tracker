import { PartialType } from '@nestjs/mapped-types';
import { CreateFinancialInstrumentDto } from './create-financial-instrument.dto';

export class UpdateFinancialInstrumentDto extends PartialType(CreateFinancialInstrumentDto) {}
