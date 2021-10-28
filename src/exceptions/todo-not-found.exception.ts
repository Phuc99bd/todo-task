import { HttpException , HttpStatus } from '@nestjs/common'
import { Schema } from 'mongoose';

export class TodoNotFoundException extends HttpException{
    constructor(id: string){
        super(`Todo with ${id} not found` , HttpStatus.NOT_FOUND);
    }
}