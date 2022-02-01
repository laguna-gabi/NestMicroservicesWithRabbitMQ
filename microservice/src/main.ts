import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        prefetchCount: 1,
        urls: ['amqp://localhost:5672'],
        queue: 'cats_queue',
        noAck: false,
        queueOptions: {
          durable: true,
        },
      },
    },
  );
  app.listen();
}
bootstrap();
