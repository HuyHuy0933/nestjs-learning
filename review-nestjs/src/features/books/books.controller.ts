import { Controller } from '@nestjs/common';
import { BooksService } from './books.service';
import { MessagePattern } from '@nestjs/microservices';
import { BookDTO } from './dto/book.dto';

function delay(ms) {
  var start = new Date().getTime();
  var end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
}

@Controller()
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @MessagePattern({ cmd: 'new_book' })
  newBook(book: BookDTO): string {
    delay(1000);
    const result = this.booksService.newBook(book);
    if (!result) {
      return 'Book already exists';
    } else {
      return result;
    }
  }

  @MessagePattern({ cmd: 'get_book' })
  getBook(bookID: string): BookDTO {
    return this.booksService.getBookByID(bookID);
  }

  @MessagePattern({ cmd: 'get_books' })
  getBooks(): BookDTO[] {
    return this.booksService.getAllBooks();
  }
}
