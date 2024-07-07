import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, catchError, concat, concatMap, finalize, map, tap } from 'rxjs';
import { DataSource } from 'typeorm';

export const ENTITY_MANAGER_KEY = 'ENTITY_MANAGER';

@Injectable()
export class TransactionInterceptor implements NestInterceptor {
  constructor(private dataSource: DataSource) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    // get request object
    const req = context.switchToHttp().getRequest<Request>();
    // start transaction
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    // attach query manager with transaction to the request
    req['manager'] = queryRunner.manager;

    return next.handle().pipe(
      concatMap(async (data) => {
        // try {
        // Commit the transaction here within the `concatMap` operator
        await queryRunner.commitTransaction();
        return data;
        // } catch (e) {
        // } finally {
        //   await queryRunner.release();
        // }
      }),
      catchError(async (err) => {
        // Rollback the transaction if an error occurs
        await queryRunner.rollbackTransaction();
        throw err;
      }),
      finalize(async () => {
        // Release the query runner after commit or rollback
        await queryRunner.release();
      }),
    );
  }
}
