import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Todo } from '../schemas/todo.schema'

@ObjectType()
export class PaginationTodo{
    @Field(()=> [Todo])
    data?: Todo[]
    @Field()
    total: number
}