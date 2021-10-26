import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTodoDto } from './dto/create-todo.dto';
import { FilterTodoDto } from './dto/filter-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoStatus } from './enums/todo-status.schema';
import { Todo , TodoDocument, TodoSchema } from './schemas/todo.schema';
import { Schema as MongooseSchema } from 'mongoose';

@Injectable()
export class TodoService {
    constructor(@InjectModel(Todo.name) private readonly model: Model<TodoDocument>){}
    async findAll(query: FilterTodoDto){
        const data =  await this.model.find()
        .skip((query.page - 1) * query.limit)
        .sort({'createdAt' : 'desc'})
        .limit(query.limit);
        const total = await this.total({});
        
        return {
            data,
            total
        }
    }
    
    async total(where: any = {}){
        return await this.model.count().where(where).exec();
    }

    async findById(id: MongooseSchema.Types.ObjectId): Promise<Todo>{
        return await this.model.findById(id).exec();
    }

    async create(createTodoDto: CreateTodoDto): Promise<Todo>{
        return await this.model.create({
            ...createTodoDto,
            createdAt: Date.now(),
            status: TodoStatus.OPEN
        })
    }

    async update(id: MongooseSchema.Types.ObjectId , updateTodoDto: UpdateTodoDto): Promise<Todo>{
        return await this.model.findByIdAndUpdate(id, updateTodoDto).exec();
    }

    async updateStatus(id: MongooseSchema.Types.ObjectId , status: TodoStatus){
        return await this.model.findByIdAndUpdate(id , { status, ...(status === TodoStatus.DONE ? { completedAt: new Date()} : {}) }).exec();
    }

    async del(id: MongooseSchema.Types.ObjectId): Promise<Todo>{
        return await this.model.findByIdAndDelete(id);
    }
}