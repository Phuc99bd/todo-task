import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { IsEmail, Min } from 'class-validator';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type UserDocument = User & Document;
@ObjectType()
@Schema()
export class User {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId

  @Field(()=> String)
  @IsEmail()
  @Prop()
  email: string;

  @Field(()=> String)
  @Prop()
  @Exclude()
  password: string;

  @Prop({ required: true })
  @Field(() => String)
  firstName: string;

  @Prop()
  @Field(() => String)
  lastName?: string;


  @Prop({ required: true })
  @Field(() => Date)
  createdAt: Date;

}

export const UserSchema = SchemaFactory.createForClass(User);