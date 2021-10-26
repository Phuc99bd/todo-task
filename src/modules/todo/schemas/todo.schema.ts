import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { TodoStatus } from '../enums/todo-status.schema';

export type TodoDocument = Todo & Document;
@ObjectType()
@Schema()
export class Todo {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId

  @Prop({ required: true })
  @Field(() => String)
  title: string;

  @Prop()
  @Field(() => String)
  description?: string;

  @Prop({ required: true })
  @Field(() => String)
  status: TodoStatus

  @Prop()
  @Field(() => Date)
  completedAt?: Date;

  @Prop({ required: true })
  @Field(() => Date)
  createdAt: Date;

}

export const TodoSchema = SchemaFactory.createForClass(Todo);