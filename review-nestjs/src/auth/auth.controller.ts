import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('sign-in')
  async login(@Body() dto: any, @Res() res: Response) {
    const user = await this.authService.signIn(dto.username, dto.password);

    return res.status(201).json(user)
  }
}
