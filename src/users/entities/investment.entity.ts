import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.entity';

@Schema()
export class Investment extends Document {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  user: User | Types.ObjectId;

  @Prop({ required: true })
  instrument_type: string; // TODO: Enum o ref

  @Prop({ required: true })
  instrument_name: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  purchase_price: number;

  @Prop({ default: Date.now })
  purchase_date: Date;

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: Date.now })
  updated_at: Date;
}

export const InvestmentSchema = SchemaFactory.createForClass(Investment);

