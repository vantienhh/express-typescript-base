import { ClientOpts, createClient, RedisClient } from 'redis';
import { Logger } from '@/utils/logger';

class ConnectRedis {
  private static instance?: ConnectRedis;
  private readonly client: RedisClient;

  constructor() {
    this.client = createClient(ConnectRedis.getConfigRedis());
    this.connectMessage();
  }

  static getInstance(): ConnectRedis {
    if (!ConnectRedis.instance) ConnectRedis.instance = new ConnectRedis();
    return ConnectRedis.instance;
  }

  private static getConfigRedis(): ClientOpts {
    let configRedis: ClientOpts = {
      port: parseInt(process.env.REDIS_PORT || '6379'),
      host: process.env.REDIS_HOST || '127.0.0.1'
    };

    if (process.env.REDIS_PASSWORD) {
      configRedis = { ...configRedis, password: process.env.REDIS_PASSWORD };
    }

    return configRedis;
  }

  getClient(): RedisClient {
    return this.client;
  }

  private connectMessage(): void {
    this.client.on('connect', () => {
      console.log('Redis client connected');
    });
    this.client.on('error', error => {
      Logger.error(error);
    });
  }
}

export const Redis = ConnectRedis.getInstance();
