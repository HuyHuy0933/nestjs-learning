import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { ItemsService } from '../items/items.service';
import { CreateItemDto } from '../items/dto/create-item.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class OrdersService {
  constructor(
    private ordersRepository: OrdersRepository,
    private itemsService: ItemsService,
  ) {}

  async getOrders() {
    return await this.ordersRepository.getOrders();
  }

  async createOrder(items: CreateItemDto[]) {
    const orderNo = `ORD_${randomUUID()}`;
    const order = await this.ordersRepository.createOrder(orderNo);
    await this.itemsService.createItems(order.id, items);
    return order;
  }
}
