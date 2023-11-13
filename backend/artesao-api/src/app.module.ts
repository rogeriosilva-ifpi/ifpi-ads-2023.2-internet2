import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { UsersModule } from './users/users.module';

const appModules = [UsersModule, CommonModule];
const typeOrmModule = TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  autoLoadEntities: true,
  migrations: ['./src/**/migrations/*.{js,ts}'],
  synchronize: false,
});

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    typeOrmModule,
    ...appModules,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
