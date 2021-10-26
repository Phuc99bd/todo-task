import { ArgsType, InputType } from '@nestjs/graphql';
import { BaseTodoDto } from './base-todo.dto'

@InputType()
export class CreateTodoDto extends BaseTodoDto {}