import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User &
  Document & {
    createdAt?: Date;
    updatedAt?: Date;
  };

@Schema({ collection: 'users', timestamps: true })
export class User {
  @Prop({ required: true, maxLength: 50 })
  name: string;

  @Prop({ required: true, maxLength: 50 })
  surname: string;

  @Prop({
    required: true,
    unique: true,
    maxLength: 50,
    lowercase: true,
    trim: true,
    match: /^([^\s@]+)@((?:[^\s@]+\.)+[^\s@]+)$/,
  })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ required: true, select: false })
  pinCode: string;

  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
