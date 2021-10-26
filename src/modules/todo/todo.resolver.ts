import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FilterTodoDto } from './dto/filter-todo.dto';
import { Todo, TodoSchema } from './schemas/todo.schema';
import { TodoService } from './todo.service';
import { PaginationTodo } from './types/pagination-todo.type';
import { Schema as MongooseSchema } from 'mongoose';
import { FindIdParams } from './dto/find-id.dto';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoStatus } from './enums/todo-status.schema';
import { TodoNotFoundException } from 'src/exceptions/todo-not-found.exception';
import { UpdateStatusTodoDto, UpdateTodoDto } from './dto/update-todo.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';

@Resolver(() => Todo)
@UseGuards(new AuthGuard())
export class TodoResolver {
    constructor(private todoService: TodoService) {}

    @Query(()=> PaginationTodo)
    async getList(@Args() query: FilterTodoDto){
        return this.todoService.findAll(query);
    }

    @Query(() => Todo)
    async getById(
        @Args() { _id }: FindIdParams,
    ) {
        const todo = await this.todoService.findById(_id);
        if(!todo){
            throw new TodoNotFoundException(_id);
        }
        return todo;
    }

    @Mutation(()=> Todo)
    async create(@Args('payload') createTodoDto: CreateTodoDto){
        return this.todoService.create(createTodoDto)
    }


    @Mutation(()=> Todo)
    async update(@Args() {_id}: FindIdParams, @Args('payload') payload: UpdateTodoDto){
        const todo = await this.todoService.findById(_id);
        if(!todo){
            throw new TodoNotFoundException(_id);
        }
        return this.todoService.update(_id , payload);
    }

    @Query(()=> Todo)
    async del(@Args() {_id}: FindIdParams){
        const todo = await this.todoService.findById(_id);
        if(!todo){
            throw new TodoNotFoundException(_id);
        }
        return this.todoService.del(_id);
    }

    @Mutation(()=> Todo)
    async updateStatus(@Args() {_id} : FindIdParams , @Args('payload') {status}: UpdateStatusTodoDto){
        const todo = await this.todoService.findById(_id);
        if(!todo){
            throw new TodoNotFoundException(_id);
        }
        return this.todoService.updateStatus(_id, status)
    }
}
