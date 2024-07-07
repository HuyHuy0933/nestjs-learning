import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';
import { AllExceptionsFilter } from './exceptions/global-exception.filter';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const microserviceTcp = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: "localhost",
      port: 3000,
    },
  });
  // microservice #2
  // const microserviceRedis = app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.REDIS,
  //   options: {
  //     host: 'localhost',
  //     port: 6379,
  //   },
  // });
  app.setGlobalPrefix('/api');
  app.useGlobalFilters(
    new HttpExceptionFilter(),
    // new AllExceptionsFilter(),
  );

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
