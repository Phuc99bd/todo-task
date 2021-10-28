import { IsNotEmpty } from 'class-validator'

export class BaseTodoDto{
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description?: string;
}