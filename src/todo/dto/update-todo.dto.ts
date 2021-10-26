import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsIn } from 'class-validator';
import { TodoStatus } from '../enums/todo-status.schema';
import { BaseTodoDto } from './base-todo.dto'

@InputType()
export class UpdateTodoDto extends BaseTodoDto{}
@InputType()
export class UpdateStatusTodoDto{
    @Field(type => TodoStatus)
    status: TodoStatus
}