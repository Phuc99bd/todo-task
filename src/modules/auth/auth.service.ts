import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import { EXPIRED_JWT, SALT, SECRET } from './constant/auth.constant';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { AccessToken } from './types/access-token.type';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private readonly model: Model<UserDocument>, private jwtService : JwtService){}

    async create(user: RegisterUserDto): Promise<AccessToken>{
        const newUser = await this.model.create({
            ...user,
            password: await bcrypt.hash(user.password , SALT),
            createdAt: Date.now()
        })
        return this.signJwt(newUser._id);
    }

    async findByEmail(input: LoginUserDto){
        const user = await this.model.findOne({ email: input.email });
       return user;
    }

    async compare(password: string , hash: string){
        return bcrypt.compare(password , hash);
    }

    async signJwt(userId: string): Promise<AccessToken>{
        return {
            userId,
            access_token: this.jwtService.sign({userId}, { secret: SECRET })
        }
    }

    async findById(_id: string){
        return await this.model.findById(_id);
    }
}
