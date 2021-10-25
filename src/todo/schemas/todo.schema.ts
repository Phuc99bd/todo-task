import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TodoStatus } from '../enums/todo-status.schema';

export type TodoDocument = Todo & Document;
@Schema()
export class Todo {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  status: TodoStatus

  @Prop()
  completedAt?: Date;

  @Prop({ required: true })
  createdAt: Date;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);