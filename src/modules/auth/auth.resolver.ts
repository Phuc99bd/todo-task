import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Schema } from 'mongoose';
import { InvalidLogin } from 'src/exceptions/invalid-login..exception';
import { InvalidToken } from 'src/exceptions/invalid-token.exception';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './schema/user.schema';
import { AccessToken } from './types/access-token.type';

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService){}

    @Mutation(()=> AccessToken)
    async signIn(@Args('payload') payload: LoginUserDto){
        const user = await this.authService.findByEmail(payload);
        if(!user){
            throw new InvalidLogin()
        }
        
        if(!await this.authService.compare(payload.password , user.password)){
            throw new InvalidLogin()
        }
        return this.authService.signJwt(user._id);
    }

    @Mutation(()=> AccessToken)
    async signUp(@Args('payload') payload: RegisterUserDto){
        return this.authService.create(payload);
    }

    @Query(()=> User)
    @UseGuards(AuthGuard)
    async me(@Context('userId') userId: string){
        if(!userId){
            throw new InvalidToken()
        }
        const user = await  this.authService.findById(userId);
        return user;
    }
}
