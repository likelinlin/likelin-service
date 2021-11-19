import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}
  async validateUser(ricoId: string, password: string): Promise<any> {
    console.log(
      'AuthService.validateUser 第二步：拿到数据去user服务里校验信息',
      ricoId,
      password,
    );
    const user = await this.userService.passwordLogin({ ricoId, password });
    if (user) {
      return user;
    } else {
      return null;
    }
  }

  async login(user: any) {
    const payload = { weappId: user.weappId, id: Number(user.id) };
    console.log('AuthService.login 第三步：存储信息', payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
