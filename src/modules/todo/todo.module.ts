import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from './schemas/todo.schema';
import { ConfigService,ConfigModule } from '@nestjs/config';
import { ClientProxyFactory, ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { TodoController } from './todo.controller';

@Module({
  providers: [
    {
      provide: 'TODO_PACKAGE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            url: 'localhost:3000',
            package: 'todos',
            protoPath: join(process.cwd(), 'src/modules/todo/todo.proto'),
          },
        })
      },
      inject: [ConfigService],
    },
  ],
  controllers: [TodoController],
  imports: [
    ClientsModule,ConfigModule]
})
export class TodoModule {}
