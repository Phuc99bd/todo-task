import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsIn } from 'class-validator';
import { TodoStatus } from '../enums/todo-status.schema';
import { BaseTodoDto } from './base-todo.dto'
import { FindIdParams } from './find-id.dto';

export class UpdateTodoDto extends BaseTodoDto{}

export class BodyUpdateTodoDto{
    params: FindIdParams;
    updateTodoDto: UpdateTodoDto
}

export class BodyUpdateStatus{
    id: string;
    status: TodoStatus
}
@InputType()
export class UpdateStatusTodoDto{
    @Field(type => TodoStatus)
    status: TodoStatus
}