import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/features/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string) {
    const user = await this.usersService.validate(username, password);

    if (!user) {
      return null;
    }

    const payload = {
      userId: user.id,
      role: user.role
    }

    return {
      ...user,
      access_token: this.jwtService.sign(payload)
    }
  }
}
