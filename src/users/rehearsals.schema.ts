import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RehearsalDocument = Rehearsal & Document;

@Schema()
export class Rehearsal {
  @Prop({ type: String })
  date: string;

  @Prop({ type: String })
  attendance: string;
}

export const RehearsalSchema = SchemaFactory.createForClass(Rehearsal);
