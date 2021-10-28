import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: "localhost:3000",
      package: 'todos',
      protoPath: join(process.cwd(), 'src/modules/todo/todo.proto'),
    },
  });
  await app.startAllMicroservices();
}
bootstrap();
