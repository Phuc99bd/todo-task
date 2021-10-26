import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Todo } from '../schemas/todo.schema'

@ObjectType()
export class PaginationTodo{
    @Field(type => [Todo])
    data: Todo[]

    @Field(type => Int)
    total: number
}