import { DataSource } from 'typeorm';
import { Invoice } from './entities/invoices.entity';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'your_user',
  password: 'your_password',
  database: 'erp_db',
  synchronize: false,
  logging: true,
  entities: [Invoice],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  subscribers: [],
});
