import { DynamicModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    // return MongooseModule.forRoot(process.env.MONGO_DATABASE_CONNECTION)

    return TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_DATABASE_HOST,
      port: Number(process.env.POSTGRES_DATABASE_PORT) || 5432,
      username: process.env.POSTGRES_DATABASE_USERNAME,
      password: process.env.POSTGRES_DATABASE_PASSWORD,
      database: process.env.POSTGRES_DATABASE_NAME,
      entities: [join(__dirname, "../**", '*.entity.{ts,js}')],
    })
  }
}
