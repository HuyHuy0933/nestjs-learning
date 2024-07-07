import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { DataSource } from 'typeorm';
import { BaseRepository } from 'src/repositories/base.repository';
import { Product } from 'src/entities/products.entity';

@Injectable({ scope: Scope.REQUEST })
export class ProductsRepository extends BaseRepository {
  constructor(dataSource: DataSource, @Inject(REQUEST) req: Request) {
    super(dataSource, req);
  }

  async getAllProducts() {
    return await this.getRepository(Product).find();
  }
}