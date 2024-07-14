import { AbstractRepository } from "@app/common";
import { Injectable, Logger } from "@nestjs/common";
import { Order } from "./src/schemas/order.schema";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";

@Injectable()
export class OrdersRepository extends AbstractRepository<Order> {
  protected readonly logger = new Logger()

  constructor(
    @InjectModel(Order.name) orderModel: Model<Order>,
    @InjectConnection() connnection: Connection,
  ) {
    super(orderModel, connnection)
  }
} 