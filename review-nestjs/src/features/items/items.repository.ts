import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { DataSource } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { BaseRepository } from 'src/repositories/base.repository';
import { Item } from 'src/entities/items.entity';

@Injectable({ scope: Scope.REQUEST })
export class ItemsRepository extends BaseRepository {
  constructor(dataSource: DataSource, @Inject(REQUEST) req: Request) {
    super(dataSource, req);
  }

  // Create multiple items
  async createItems(orderId: number, data: CreateItemDto[]) {
    const items = data.map((e) => {
      return {
        order: { id: orderId },
        product: { id: e.productId },
        quantity: e.quantity,
      } as Item;
    });

    await this.getRepository(Item).insert(items);
  }
}