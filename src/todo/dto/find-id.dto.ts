import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';
import { Schema } from 'mongoose';

@ArgsType()
export class FindIdParams{
    @IsMongoId()
    @Field(type => String)
    _id: Schema.Types.ObjectId;
}