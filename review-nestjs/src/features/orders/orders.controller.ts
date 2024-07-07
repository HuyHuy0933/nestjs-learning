import { Body, Controller, Get, ParseArrayPipe, Post, UseInterceptors } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { TransactionInterceptor } from 'src/interceptors/transaction.interceptor';
import { CreateItemDto } from '../items/dto/create-item.dto';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  async getOrders() {
    return await this.ordersService.getOrders();
  }

  @Post()
  @UseInterceptors(TransactionInterceptor)
  async createOrder(
    @Body(new ParseArrayPipe({ items: CreateItemDto }))
    data: CreateItemDto[],
  ) {
    return await this.ordersService.createOrder(data);
  }
}
