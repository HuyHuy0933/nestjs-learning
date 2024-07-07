import { join } from 'path';
import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_DATABASE_HOST,
  port: Number(process.env.POSTGRES_DATABASE_PORT) || 5432,
  username: process.env.POSTGRES_DATABASE_USERNAME,
  password: process.env.POSTGRES_DATABASE_PASSWORD,
  database: process.env.POSTGRES_DATABASE_NAME,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});

export default dataSource