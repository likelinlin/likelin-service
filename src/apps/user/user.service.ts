import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import axios from 'axios';

@Injectable()
export class UserService {
  constructor(
    @Inject('user_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return this.userRepository.findOne({ id });
  }

  // 新建用户或者更新
  async wxCreateAndUpdate(params) {
    const userInfo = params.userInfo;
    const weappId = params.weappId;

    const findOneByWeappIdRes = this.userRepository.findOne({
      weappId: weappId,
    });

    if (findOneByWeappIdRes) {
      return this.userRepository.update(
        { weappId: weappId },
        {
          gender: userInfo.gender,
          nickName: userInfo.nickName,
          city: userInfo.city,
        },
      );
    } else {
      const insertRes = await this.userRepository.insert([
        {
          weappId: weappId,
          gender: userInfo.gender,
          nickName: userInfo.nickName,
          city: userInfo.city,
        },
      ]);
      return insertRes;
    }
  }

  async checkIsHasUser(weappId) {
    const findWeappIdRes = await this.userRepository.findOne({ weappId });
    if (findWeappIdRes) {
      const authLoginRes = await axios
        .post('http://127.0.0.1:8080/api/v1/auth/login', {
          ricoId: findWeappIdRes.ricoId,
          password: findWeappIdRes.password,
        })
        .then((res) => res.data);
      return {
        token: authLoginRes.access_token,
      };
    } else {
      return {
        token: null,
      };
    }
    // return `This action removes a #${weappId} user`;
  }

  async passwordLogin({ ricoId, password }) {
    const user = await this.userRepository.find({ ricoId, password });
    if (user.length > 0) {
      return user[0];
    } else {
      throw new HttpException(
        {
          statusCode: HttpStatus.FORBIDDEN,
          message: '账号密码错误',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
