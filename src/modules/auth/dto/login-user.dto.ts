import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, Min } from 'class-validator'

@InputType()
export class LoginUserDto{
    @Field()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Field()
    @IsNotEmpty()
    @Min(5)
    password: string;
}