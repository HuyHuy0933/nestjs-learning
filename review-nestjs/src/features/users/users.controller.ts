import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { TransactionInterceptor } from 'src/interceptors/transaction.interceptor';

@Controller('users')
// @UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  async getUser(@Request() req) {
    console.log('Start');

    setTimeout(function () {
      console.log('Timeout');
    }, 0);

    new Promise((resolve) => {
      resolve(1)
      console.log("resolve")
    }).then(function () {
      console.log('Promise'); // microTask!
    });

    process.nextTick(() => console.log("next tick"))

    console.log('End');
    return true;
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('transaction')
  async doTransaction(@Request() req) {
    throw new BadRequestException()
    return this.userService.doTransaction();
  }

  @Post('transaction-interceptor')
  async doTransactionWithInterceptor() {
    return this.userService.doTransactionWithInterceptor();
  }
}
