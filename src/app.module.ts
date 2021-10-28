import { Module } from '@nestjs/common';
import { TodoModule } from './modules/todo/todo.module';
import { MongooseModule } from '@nestjs/mongoose'
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './modules/auth/auth.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    TodoModule,
    // AuthModule,
  ],
})
export class AppModule { }
