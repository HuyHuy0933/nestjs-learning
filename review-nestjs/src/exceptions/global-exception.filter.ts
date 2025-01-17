import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    this.logger.error(exception);

    let errorResult: [HttpStatus, string[]] = null;

    // if (exception instanceof EntityValidationException) {
    //   errorResult = [HttpStatus.BAD_REQUEST, [exception.message]];
    // } else
    if (exception instanceof HttpException) {
      const messages = exception.getResponse();
      errorResult = [
        exception.getStatus(),
        Array.isArray(messages) ? messages : [messages],
      ];
    } else {
      errorResult = [
        HttpStatus.INTERNAL_SERVER_ERROR,
        ['Something went wrong'],
      ];
    }

    response.status(errorResult[0]).json({
      timestamp: new Date().toISOString(),
      message: errorResult[1],
    });
  }
}
