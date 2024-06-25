import { FactoryProvider } from '@nestjs/common';
import { Redis } from 'ioredis';

import { createClient , RedisClientType } from 'redis';

export const redisClientFactory: FactoryProvider = {
    provide: 'RedisClient',
    useFactory:async ()=> {
        const client = createClient({
            
        });
        client.on('error', err => console.log('Redis Client Error', err));
        await client.connect();

        return client;
    },
    inject: []
}