import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MoneyDocument = Money & Document;

@Schema()
export class Money {
  @Prop({ type: String, required: true, unique: true })
  paidMonth: string;

  @Prop({ type: String, required: true, unique: true })
  paidYear: string;
}

export const MoneySchema = SchemaFactory.createForClass(Money);
