import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from './schemas/todo.schema';
import { TodoResolver } from './todo.resolver';

@Module({
  providers: [TodoService, TodoResolver],
  controllers: [],
  imports: [MongooseModule.forFeature([{ name: Todo.name , schema: TodoSchema }])]
})
export class TodoModule {}
