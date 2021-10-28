import { Controller, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTodoDto } from './dto/create-todo.dto';
import { FilterTodoDto } from './dto/filter-todo.dto';
import { BodyUpdateStatus, BodyUpdateTodoDto, UpdateTodoDto } from './dto/update-todo.dto';
import { TodoStatus } from '../../commons/enums/todo-status.enum';
import { Todo, TodoDocument, TodoSchema } from './schemas/todo.schema';
import { Schema as MongooseSchema } from 'mongoose';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateSubscriberDto, FindIdParams } from './dto/find-id.dto';
import { StatusResponse } from 'src/commons/enums/status-response.enum';
import { CommonResponse } from 'src/commons/interfaces/response.interface';

@Controller()
export class TodoService {
    constructor(@InjectModel(Todo.name) private readonly model: Model<TodoDocument>) { }

    @GrpcMethod()
    async findAll(query: FilterTodoDto) {
        try {
            const data = await this.model.find()
                .skip((query.page - 1) * query.limit)
                .sort({ 'createdAt': 'desc' })
                .limit(query.limit);
            const total = await this.total({});

            return {
                data,
                total
            }
        } catch (error) {

        }

    }

    async total(where: any = {}) {
        return await this.model.count().where(where).exec();
    }

    @GrpcMethod()
    async addSubscriber(subscriber: CreateSubscriberDto) {
        return subscriber;
    }

    @GrpcMethod()
    async findById(params: FindIdParams): Promise<CommonResponse<Todo>> {
        const todo = await this.model.findById(params.id).exec();
        return {
            data: todo,
            status: todo ? StatusResponse.SUCCESS : StatusResponse.ERROR
        }
    }

    @GrpcMethod()
    async create(createTodoDto: CreateTodoDto): Promise<Todo> {
        return await this.model.create({
            ...createTodoDto,
            createdAt: Date.now(),
            status: TodoStatus.OPEN
        })
    }

    @GrpcMethod()
    async update(updateDto: BodyUpdateTodoDto): Promise<Todo> {
        return await this.model.findByIdAndUpdate(updateDto.params.id, updateDto.updateTodoDto).exec();
    }

    @GrpcMethod()
    async updateStatus(payload: BodyUpdateStatus) {
        return await this.model.findByIdAndUpdate(payload.id, { status: payload.status, ...(payload.status === TodoStatus.DONE ? { completedAt: new Date() } : {}) }).exec();
    }

    @GrpcMethod()
    async del(params: FindIdParams): Promise<Todo> {
        return await this.model.findByIdAndDelete(params.id);
    }
}