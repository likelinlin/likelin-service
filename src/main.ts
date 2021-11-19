import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import axios from 'axios';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 设置 api/v1 前缀 要在最前面
  app.setGlobalPrefix('api/v1');
  // 设置swagger
  const config = new DocumentBuilder()
    .addBasicAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', name: 'Token' },
      'access-token',
    )
    .setTitle('活动接口文档')
    .setDescription('活动接口文档')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config, {});
  SwaggerModule.setup('swagger', app, document);

  // 所有请求把token加上Bearer重新赋值给authorization
  app.use('*', (req, res, next) => {
    if (!req.headers['authorization']) {
      req.headers['authorization'] = 'Bearer ' + req.headers['token'];
    }
    next();
  });
  // 设置请求体限制
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  // 设置跨域
  app.enableCors();
  await app.listen(8080);
}
bootstrap();
