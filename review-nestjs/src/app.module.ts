import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './features/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { CatsModule } from './features/cats/cats.module';
import { ProductsController } from './features/products/products.controller';
import { ProductsModule } from './features/products/products.module';
import { ItemsModule } from './features/items/items.module';
import { OrdersModule } from './features/orders/orders.module';
import { BooksModule } from './features/books/books.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule.forRoot(),
    ProductsModule,
    ItemsModule,
    OrdersModule,
    BooksModule
    // CatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
