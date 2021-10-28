import { Observable } from 'node_modules/rxjs/dist/types';
import { CommonResponse } from 'src/commons/interfaces/response.interface';
import { CreateTodoDto } from './dto/create-todo.dto';
import { FilterTodoDto } from './dto/filter-todo.dto';
import { CreateSubscriberDto, FindIdParams } from './dto/find-id.dto';
import { BodyUpdateStatus, BodyUpdateTodoDto } from './dto/update-todo.dto';
import { TodoStatus } from './enums/todo-status.schema';
import { Todo  } from './schemas/todo.schema';
import { PaginationTodo } from './types/pagination-todo.type';

export interface TodoService {
    addSubscriber(subscriber: CreateSubscriberDto): Observable<CreateSubscriberDto>;

    findAll(query: FilterTodoDto): Observable<PaginationTodo>;

    findById(params: FindIdParams): Observable<CommonResponse<Todo>>;

    create(createTodoDto: CreateTodoDto): Observable<Todo>;

    update(updateTodoDto: BodyUpdateTodoDto): Observable<Todo>;

    updateStatus(updateStatus: BodyUpdateStatus);

    del(params: FindIdParams): Observable<Todo>;
}