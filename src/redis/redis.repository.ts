import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class RedisRepository implements OnModuleDestroy {
    constructor(@Inject('RedisClient') private readonly redisClient: RedisClientType) {}

    async setJson<T>(key:string, value:T, ttl:number): Promise<void> {
        await this.redisClient.json.SET(key,'.',JSON.stringify(value),{NX:true})
    }
    async setString(key:string, value:string): Promise<void> {
        await this.redisClient.set(key,value,{},)
    }
    onModuleDestroy() {
        this.redisClient.disconnect();
    }
}