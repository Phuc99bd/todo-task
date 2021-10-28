import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Todo } from '../schemas/todo.schema'

export class PaginationTodo{
    data: Todo[]
    total: number
}