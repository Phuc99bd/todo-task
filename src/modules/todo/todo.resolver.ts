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
import { Inject, OnModuleInit, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { ClientGrpc } from '@nestjs/microservices';
import { StatusResponse } from 'src/commons/enums/status-response.enum';

@Resolver(() => Todo)
// @UseGuards(new AuthGuard())
export class TodoResolver implements OnModuleInit {
    private service: TodoService;

    constructor(@Inject('TODO_PACKAGE') private client: ClientGrpc) { }

    onModuleInit() {
        this.service = this.client.getService<TodoService>('TodoService');
    }

    @Query(()=> PaginationTodo)
    async getList(@Args() query: FilterTodoDto){
        return this.service.findAll(query).toPromise();
    }

    @Query(() => Todo)
    async getById(
        @Args() params: FindIdParams,
    ) {
        const todo = await this.service.findById(params).toPromise();
        if(todo.status === StatusResponse.ERROR){
            throw new TodoNotFoundException(params.id);
        }
        return todo.data;
    }

    @Mutation(()=> Todo)
    async create(@Args('payload') createTodoDto: CreateTodoDto){
        return this.service.create(createTodoDto).toPromise()
    }


    @Mutation(()=> Todo)
    async update(@Args() params: FindIdParams, @Args('payload') payload: UpdateTodoDto){
        const todo = await this.service.findById(params).toPromise();
        if(todo.status === StatusResponse.ERROR){
            throw new TodoNotFoundException(params.id);
        }
        return this.service.update({ params: params , updateTodoDto: payload }).toPromise();
    }

    @Query(()=> Todo)
    async del(@Args() params: FindIdParams){
        const todo = await this.service.findById(params).toPromise();
        if(todo.status === StatusResponse.ERROR){
            throw new TodoNotFoundException(params.id);
        }
        return this.service.del(params).toPromise();
    }

    @Mutation(()=> Todo)
    async updateStatus(@Args() params : FindIdParams , @Args('payload') {status}: UpdateStatusTodoDto){
        const todo = await this.service.findById(params).toPromise();
        if(todo.status === StatusResponse.ERROR){
            throw new TodoNotFoundException(params.id);
        }
        return this.service.updateStatus({ id: params.id ,status: status })
    }
}