import { createConnection } from 'typeorm';

const dbUrl = process.env.NODE_ENV === 'pro' ? '12' : '12.12.12.12';
console.log(dbUrl, 'dbUrl');
export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () =>
      await createConnection({
        type: 'mysql',
        host: dbUrl,
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'activity-fat',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
        // charset:'utf8mb4'
        // mysql数据库编码使用utf8mb4_general_ci
      }),
  },
];
