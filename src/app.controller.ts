import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './apps/auth/guards/local-auth.guard';
import { JwtAuthGuard } from './apps/auth/guards/jwt-auth.guard';
import { AuthService } from './apps/auth/auth.service';
// import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {
    // console.log(process.env.NODE_ENV)
  }

  @Get('/vi/health')
  getHello(): string {
    return '3652ms';
  }

  // 颁发token的接口，其他接口要用，直接用axios请求
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // 需要鉴权的接口
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
