import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
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
export class TodoController {
    constructor(private readonly service: TodoService) {}

    @Get()
    @UsePipes(new ValidationPipe({transform: true}))
    async index(@Query() query: FilterTodoDto) {
        return this.service.findAll(query);
    }

    @Get(":id")
    @UsePipes(ValidationPipe)
    async findById(@Param() {id}: FindIdParams) {
        const todo = await this.service.findById(id);
        if (!todo) {
            throw new TodoNotFoundException(id);
        }
        return todo;
    }

    @Post()
    async create(@Body(ValidationPipe) createTodoDto: CreateTodoDto) {
        return this.service.create(createTodoDto);
    }

    @Put(':id')
    @UsePipes(ValidationPipe)
    async update(@Param() {id}: FindIdParams, @Body(ValidationPipe) updateTodoDto: UpdateTodoDto) {
        const todo = await this.service.findById(id);
        if (!todo) {
            throw new TodoNotFoundException(id);
        }
        return this.service.update(id, updateTodoDto);
    }

    @Delete(':id')
    @UsePipes(ValidationPipe)
    async delete(@Param() {id}: FindIdParams) {
        return this.service.del(id);
    }

    @Put('/status/:id')
    async updateStatus(@Param() {id}: FindIdParams, @Body('status') status: TodoStatus) {
        const todo = await this.service.findById(id);
        if (!todo) {
            throw new TodoNotFoundException(id);
        }
        return this.service.updateStatus(id, status);
    }

}
