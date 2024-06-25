import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { RedisRepository } from 'src/redis/redis.repository';
import { RedisClientType, RedisFunctions, RedisModules, RedisScripts } from 'redis';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @Inject('REDIS_CLIENT')
    private readonly redisRepository: RedisClientType
  ){}

  async create(createProductDto: CreateProductDto) {
    //create and insert on redis as a json
    const product = await this.productRepository.save(createProductDto);
    await this.redisRepository.json.set(`${product.id}:product`, '.',JSON.stringify(product));
    // await this.redisRepository.setJson(`${product.id}:product`, product, 60);
    return product;
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  search(name: string){
    return this.productRepository.query(`SELECT * FROM products WHERE name LIKE '%${name}%'`);
    // return this.productRepository.query(`SELECT 1+1;`)
  }
  searchRedis(name: string){
    return `This action search a #${name} product`;
  }
}
