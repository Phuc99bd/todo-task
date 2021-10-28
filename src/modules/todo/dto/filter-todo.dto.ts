import { ParseIntPipe } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class FilterTodoDto{
    
    @IsNotEmpty()
    @Transform((body: any) => parseInt(body.value), {toClassOnly: true})
    @IsNumber()
    page: number;

    @IsNotEmpty()
    @Transform((body: any) => parseInt(body.value), {toClassOnly: true})
    @IsNumber()
    limit: number;
}