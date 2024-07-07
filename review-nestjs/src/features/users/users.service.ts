import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    private dataSource: DataSource,
  ) {}

  async findOne(id: number): Promise<User | undefined> {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async validate(
    username: string,
    password: string,
  ): Promise<User | undefined> {
    return await this.usersRepository.findOne({ where: { username } });
  }

  async create(dto: CreateUserDto) {
    const user = await this.usersRepository.findOne({
      where: { username: dto.username },
    });

    if (user) {
      throw new BadRequestException('username is duplicated!');
    }

    const newUser = await this.usersRepository.save({
      username: dto.username,
      password: dto.password,
      firstName: dto.firstname,
      lastName: dto.lastname,
      role: 'user',
      isActive: true,
    });

    return newUser;
  }

  async doTransaction() {
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      await queryRunner.query('SELECT * FROM user');

      // we can also access entity manager that works with connection created by a query runner:
      const users = await queryRunner.manager.find(User);
      const user1 = users.find((x) => x.id === 1);
      const user2 = users.find((x) => x.id === 2);

      user1.firstName = 'lee4';
      user2.firstName = 'lexuan2';

      await queryRunner.manager.save(user1);
      const updatedUser1 = await queryRunner.manager.find(User, {
        where: { id: 1 },
      });
      // throw new Error("Update fail")
      await queryRunner.manager.save(user2);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    return true;
  }

  async doTransactionWithInterceptor() {
    
  }
}
