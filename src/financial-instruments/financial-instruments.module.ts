import { Module } from '@nestjs/common';
import { FinancialInstrumentsService } from './services/financial-instruments.service';
import { FinancialInstrumentsController } from './controllers/financial-instruments.controller';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { FinancialInstrument, FinancialInstrumentSchema } from './entities/financial-instrument.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: FinancialInstrument.name,
      schema: FinancialInstrumentSchema
    }])
  ],
  controllers: [FinancialInstrumentsController],
  providers: [FinancialInstrumentsService]
})
export class FinancialInstrumentsModule {
 }
