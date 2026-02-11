import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ChildDocument = Child &
  Document & {
    createdAt?: Date;
    updatedAt?: Date;
  };

@Schema({ collection: 'children', timestamps: true })
export class Child {
  @Prop({ required: true, maxLength: 50 })
  name: string;

  @Prop({ required: true })
  birthDate: Date;

  @Prop({ required: true })
  avatar: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  responsibleId: Types.ObjectId;

  createdAt: Date;
}

export const ChildSchema = SchemaFactory.createForClass(Child);
