import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { RedisClientType, RedisFunctions, RedisModules, RedisScripts } from 'redis';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('REDIS_CLIENT')
    private readonly redisRepository: RedisClientType<RedisModules, RedisFunctions, RedisScripts>
  ) {}

  @Get()
  async getHello(): Promise<string> {
    const result = await  this.redisRepository.ping();
    return result;
  }
}
