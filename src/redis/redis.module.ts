import { Module } from '@nestjs/common';
import { RedisRepository } from './redis.repository';
import { redisClientFactory } from './redis.factory';
import { createClient } from 'redis';

@Module({
    providers: [{
        provide: 'REDIS_OPTIONS',
        useValue:{
            url: 'redis://localhost:6379'
        }
    },{
        inject: ['REDIS_OPTIONS'],
        provide: 'REDIS_CLIENT',
        useFactory: async()=>{
            const client = createClient({
                url: 'redis://default:tcc@localhost:6379',

            });
            await client.connect();
            return client;
        }
    }], 
    exports: ['REDIS_CLIENT'],
})
export class RedisModule{}