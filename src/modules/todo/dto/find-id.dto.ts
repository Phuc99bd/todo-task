import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';
import { Schema } from 'mongoose';

@ArgsType()
export class FindIdParams{
    @IsMongoId()
    id: string;
}

export class CreateSubscriberDto{
    email: string;
    name: string;
}