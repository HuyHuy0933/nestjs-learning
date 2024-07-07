import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { BookDTO } from './dto/book.dto';
import { firstValueFrom } from 'rxjs';

@Controller('books')
export class BooksController {
  constructor(@Inject('BOOKS_SERVICE') private client: ClientProxy) {}

  @Get()
  getAllBooks() {
    return this.client.send({ cmd: 'get_books' }, {});
  }

  @Get(':id')
  getBookByID(@Param('id') id) {
    return this.client.send({ cmd: 'get_book' }, id); 
  }

  @Post()
  async createNewBook(@Body() book: BookDTO) {
    const result = await firstValueFrom(this.client.send({ cmd: 'new_book' }, book))
    console.log(result)
    return true
  }
}
