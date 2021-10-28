import { CreateTodoDto } from './dto/create-todo.dto';
import { FilterTodoDto } from './dto/filter-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoStatus } from './enums/todo-status.schema';
import { Todo  } from './schemas/todo.schema';
import { PaginationTodo } from './types/pagination-todo.type';

export interface TodoService {

    findAll(query: FilterTodoDto): Promise<PaginationTodo>;

    findById(id: string): Promise<Todo>;

    create(createTodoDto: CreateTodoDto): Promise<Todo>;

    update(id: string , updateTodoDto: UpdateTodoDto): Promise<Todo>;

    updateStatus(id: string , status: TodoStatus);

    del(id: string): Promise<Todo>;
}