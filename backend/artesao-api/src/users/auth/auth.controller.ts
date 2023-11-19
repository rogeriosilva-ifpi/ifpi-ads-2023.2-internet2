import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { SigninDto } from '../dto/signin.dto';
import { SignupDto } from '../dto/signup.dto';
import { User } from '../entities/user.entity';
import { AuthService } from './auth.service';
import { GetUser } from './get-user.decorator';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  async signup(@Body() input: SignupDto, @Res() res: Response) {
    const id = await this.authService.signup(input);
    return res.json({ id });
  }

  @Public()
  @Post('signin')
  async token(@Body() input: SigninDto, @Res() res: Response) {
    const tokenData = await this.authService.signin(input);
    return res.json(tokenData);
  }

  @Get('me')
  async me(@GetUser() user: User, @Res() res: Response) {
    return res.json(user);
  }
}
