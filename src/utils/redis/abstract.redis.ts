import { RedisClient } from 'redis'
import { Redis } from '@/utils/redis/redis'

export abstract class AbstractRedis {
  protected redis: typeof Redis

  protected constructor() {
    this.redis = Redis
  }

  protected clientRedis(): RedisClient {
    return this.redis.getClient()
  }

  async hasKeyInRedis(key: string): Promise<boolean> {
    return this.clientRedis().get(key)
  }

  async get(key: string): Promise<string | null> {
    return new Promise((resolve, reject) => {
      this.clientRedis().get(key, (err, reply) => {
        if (err) reject(err)
        resolve(reply)
      })
    })
  }
}
