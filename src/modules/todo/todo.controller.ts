import { Body, Controller, Delete, Get, Inject, OnModuleInit, Param, Post, Put, Query, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { TodoNotFoundException } from 'src/exceptions/todo-not-found.exception';
import { TransformInterceptor } from 'src/transforms/transform-exception';
import { CreateTodoDto } from './dto/create-todo.dto';
import { FilterTodoDto } from './dto/filter-todo.dto';
import { FindIdParams } from './dto/find-id.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoStatus } from './enums/todo-status.schema';
import { TodoService } from './todo.service';

@Controller('todos')
@UseInterceptors(TransformInterceptor)
export class TodoController implements OnModuleInit {
    private service : TodoService;

    constructor(@Inject('TODO_PACKAGE') private client: ClientGrpc) {}

    onModuleInit() {
        this.service = this.client.getService<TodoService>('TodoService');
      }

    @Get()
    @UsePipes(new ValidationPipe({transform: true}))
    async findAll(@Query() query: FilterTodoDto) {
        return this.service.findAll(query);
    }

    @Get(":id")
    @UsePipes(ValidationPipe)
    async findById(@Param() {_id}: FindIdParams) {
        console.log(_id , "con");
        
        const todo = await this.service.findById(_id);
        if (!todo) {
            throw new TodoNotFoundException(_id);
        }
        return todo;
    }

    @Post()
    async create(@Body(ValidationPipe) createTodoDto: CreateTodoDto) {
        return this.service.create(createTodoDto);
    }

    @Put(':id')
    @UsePipes(ValidationPipe)
    async update(@Param() {_id}: FindIdParams, @Body(ValidationPipe) updateTodoDto: UpdateTodoDto) {
        const todo = await this.service.findById(_id);
        if (!todo) {
            throw new TodoNotFoundException(_id);
        }
        return this.service.update(_id, updateTodoDto);
    }

    @Delete(':id')
    @UsePipes(ValidationPipe)
    async delete(@Param() {_id}: FindIdParams) {
        return this.service.del(_id);
    }

    @Put('/status/:id')
    async updateStatus(@Param() {_id}: FindIdParams, @Body('status') status: TodoStatus) {
        const todo = await this.service.findById(_id);
        if (!todo) {
            throw new TodoNotFoundException(_id);
        }
        return this.service.updateStatus(_id, status);
    }

}