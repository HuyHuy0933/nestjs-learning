import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { BooksController } from './books.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    {
      provide: 'BOOKS_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('BOOKSTORE_SERVICE_HOST'),
            port: configService.get('BOOKSTORE_SERVICE_PORT'),
          },
        });
      },
    },
  ],
  controllers: [BooksController]
})
export class BooksModule {}
