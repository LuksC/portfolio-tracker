import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FinancialInstrument } from '../entities/financial-instrument.entity';
import { Model } from 'mongoose';

@Injectable()
export class FinancialInstrumentsService {
constructor(
  @InjectModel(FinancialInstrument.name) private financialModel : Model<FinancialInstrument>
) {}
  findAll() {
    return this.financialModel.find().exec();
  }

  findOne(id: string) {
    return this.financialModel.findById(id).exec();
  }
}
