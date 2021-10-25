import { HttpException , HttpStatus } from '@nestjs/common'

export class TodoNotFoundException extends HttpException{
    constructor(id: string){
        super(`Todo with ${id} not found` , HttpStatus.NOT_FOUND);
    }
}