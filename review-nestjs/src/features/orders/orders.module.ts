import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrdersRepository } from './orders.repository';
import { ItemsModule } from '../items/items.module';

@Module({
  imports: [ItemsModule],
  providers: [OrdersService, OrdersRepository],
  controllers: [OrdersController]
})
export class OrdersModule {}
