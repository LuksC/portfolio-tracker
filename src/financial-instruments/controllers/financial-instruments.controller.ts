import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { FinancialInstrumentsService } from '../services/financial-instruments.service';
import { MongoIdPipe } from 'src/pipes/mongo-id.pipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Financial Instruments')
@UseGuards(JwtAuthGuard)
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
