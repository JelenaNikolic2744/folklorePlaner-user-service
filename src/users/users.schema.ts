import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Money } from './money.schema';
import { Rehearsal } from './rehearsals.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ type: Boolean, required: true })
  admin: boolean;

  @Prop({ type: String, required: true, unique: true })
  username: string;

  @Prop({
    type: String,
    required: true,
    length: { minimum: 6, message: 'Password must have at least 6 characters' },
  })
  password: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  lastname: string;

  @Prop({ type: String, required: true })
  birthday: string;

  @Prop({ type: String, required: true })
  address: string;

  @Prop({ type: String, required: true })
  cityOfBirth: string;

  @Prop({ type: String, required: true })
  cityOfLiving: string;

  @Prop({ type: String, required: true })
  phone: string;

  @Prop([Money])
  money: Money[];

  @Prop([Rehearsal])
  rehearsal: Rehearsal[];
}

export const UserSchema = SchemaFactory.createForClass(User);
