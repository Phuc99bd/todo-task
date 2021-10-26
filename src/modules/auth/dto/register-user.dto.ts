import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, Min } from 'class-validator'

@InputType()
export class RegisterUserDto{
    @Field()
    @IsNotEmpty()
    firstName: string;

    @Field()
    @IsNotEmpty()
    lastName: string;

    @Field()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Field()
    @IsNotEmpty()
    @Min(5)
    password: string;
}