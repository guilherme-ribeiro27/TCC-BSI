import { Inject, Injectable } from '@nestjs/common';
import { RedisRepository } from './redis.repository';
import { CreateProductDto } from 'src/product/dto/create-product.dto';

@Injectable()
export class RedisService{
    constructor(@Inject(RedisRepository) private readonly redisRepository: RedisRepository) {}

    async setString(key: string, value: string, ttl: number) {
        return this.redisRepository.setJson(key, value, ttl);
    }
    async saveProduct(key: string, value: CreateProductDto, ttl: number) {
        return this.redisRepository.setJson(key, value, ttl);
    }
}