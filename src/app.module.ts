import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { Product } from './product/entities/product.entity';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    ProductModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'tcc',
      password: 'tcc',
      database: 'tcc',
      entities:[Product]
    }),
    RedisModule
  ],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
