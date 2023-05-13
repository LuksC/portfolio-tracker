import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateFinancialInstrumentDto } from '../dto/create-financial-instrument.dto';
import { UpdateFinancialInstrumentDto } from '../dto/update-financial-instrument.dto';
import { FinancialInstrumentsService } from '../services/financial-instruments.service';
import { MongoIdPipe } from 'src/pipes/mongo-id.pipe';

@Controller('financial-instruments')
export class FinancialInstrumentsController {
  constructor(private readonly financialInstrumentsService: FinancialInstrumentsService) { }

  @Get()
  findAll() {
    return this.financialInstrumentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', MongoIdPipe) id: string) {
    return this.financialInstrumentsService.findOne(id);
  }
}
