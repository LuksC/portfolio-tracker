import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class FinancialInstrument extends Document {
    @Prop({ required: true })
    ticker: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    sector: string;

    @Prop({ required: true })
    location: string;

    @Prop({ required: true })
    exchange: string;

    @Prop({required: true})
    ratio: number;
  }

  export const FinancialInstrumentSchema = SchemaFactory.createForClass(FinancialInstrument);

