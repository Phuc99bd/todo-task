import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { MongooseModule } from '@nestjs/mongoose'
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      sortSchema: true,
      playground: true,
      debug: false,
    }),
    MongooseModule.forRoot('mongodb://localhost/nest'),
    TodoModule
  ],
  providers: []
})
export class AppModule { }
