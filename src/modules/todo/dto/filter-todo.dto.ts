import { ParseIntPipe } from '@nestjs/common';
import { ArgsType, Field } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

@ArgsType()
export class FilterTodoDto{
    
    @IsNotEmpty()
    @Transform((body: any) => parseInt(body.value), {toClassOnly: true})
    @IsNumber()
    @Field()
    page: number;

    @IsNotEmpty()
    @Transform((body: any) => parseInt(body.value), {toClassOnly: true})
    @IsNumber()
    @Field()
    limit: number;
}