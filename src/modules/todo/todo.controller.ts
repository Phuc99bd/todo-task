import { Body, Controller, Delete, Get, Inject, OnModuleInit, Param, Post, Put, Query, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { StatusResponse } from 'src/commons/enums/status-response.enum';
import { CommonResponse } from 'src/commons/interfaces/response.interface';
import { TodoNotFoundException } from 'src/exceptions/todo-not-found.exception';
import { TransformInterceptor } from 'src/transforms/transform-exception';
import { CreateTodoDto } from './dto/create-todo.dto';
import { FilterTodoDto } from './dto/filter-todo.dto';
import { CreateSubscriberDto, FindIdParams } from './dto/find-id.dto';
import { TodoStatus } from './enums/todo-status.schema';
import { Todo } from './schemas/todo.schema';
import { TodoService } from './todo.service';
import { Observable } from 'rxjs';
import { PaginationTransformInterceptor } from 'src/transforms/pagination-exception';
import { UpdateTodoDto } from './dto/update-todo.dto';
@Controller('todos')
export class TodoController implements OnModuleInit {
    private service: TodoService;

    constructor(@Inject('TODO_PACKAGE') private client: ClientGrpc) { }

    onModuleInit() {
        this.service = this.client.getService<TodoService>('TodoService');
    }

    @Get()
    @UsePipes(new ValidationPipe({ transform: true }))
    @UseInterceptors(PaginationTransformInterceptor)
    async findAll(@Query() query: FilterTodoDto) {
        return this.service.findAll(query);
    }


    @Post("/test/subscriber")
    @UseInterceptors(TransformInterceptor)
    @UsePipes(new ValidationPipe({ transform: true }))
    async testSub(@Body() body: CreateSubscriberDto) {
        return this.service.addSubscriber(body);
    }

    @Get(":id")
    @UsePipes(ValidationPipe)
    @UseInterceptors(TransformInterceptor)
    async findById(@Param() params: FindIdParams) {
        const todo = await this.service.findById(params).toPromise();
        if(todo.status === StatusResponse.ERROR){
            throw new TodoNotFoundException(params.id);
        }
        return todo.data;
    }

    @Post()
    @UseInterceptors(TransformInterceptor)
    async create(@Body(ValidationPipe) createTodoDto: CreateTodoDto) {
        return this.service.create(createTodoDto);
    }

    @Put(':id')
    @UsePipes(ValidationPipe)
    @UseInterceptors(TransformInterceptor)
    async update(@Param() params: FindIdParams, @Body(ValidationPipe) updateTodoDto: UpdateTodoDto) {
        const todo = await this.service.findById(params).toPromise();
        if(todo.status === StatusResponse.ERROR){
            throw new TodoNotFoundException(params.id);
        }
        return this.service.update({params, updateTodoDto});
    }

    @Delete(':id')
    @UseInterceptors(TransformInterceptor)
    @UsePipes(ValidationPipe)
    async delete(@Param() params: FindIdParams) {
        const todo = await this.service.findById(params).toPromise();
        if(todo.status === StatusResponse.ERROR){
            throw new TodoNotFoundException(params.id);
        }
        return this.service.del(params);
    }

    @Put('/status/:id')
    @UseInterceptors(TransformInterceptor)
    async updateStatus(@Param() params: FindIdParams, @Body('status') status: TodoStatus) {
        const todo = await this.service.findById(params).toPromise();
        if(todo.status === StatusResponse.ERROR){
            throw new TodoNotFoundException(params.id);
        }
        return this.service.updateStatus({ id: params.id , status });
    }

}