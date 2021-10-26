import { Field, ObjectType } from "@nestjs/graphql";
import { Schema } from "mongoose";

@ObjectType()
export class AccessToken{
    @Field()
    userId: string;

    @Field()
    access_token: string;
}