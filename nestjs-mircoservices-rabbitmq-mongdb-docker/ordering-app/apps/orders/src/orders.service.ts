import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateOrderRequest } from './dto/create-order.request';
import { OrdersRepository } from '../orders.repository';
import { BILLING_SERVICE } from '../constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {
  private readonly logger= new Logger(OrdersService.name)
  constructor(
    private readonly ordersRepository: OrdersRepository,
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy,
  ) {}

  async createOrder(request: CreateOrderRequest) {
    const session = await this.ordersRepository.startTransaction();
    try {
      const order = await this.ordersRepository.create(request);
      await lastValueFrom(
        this.billingClient.emit('order_created', {
          request,
        }),
      );

      await session.commitTransaction()
      return order;
    } catch (err) {
      await session.abortTransaction();
      this.logger.error(err)
      console.log(err)
      throw err;
    }
  }

  async getOrders() {
    return this.ordersRepository.find({});
  }
}
