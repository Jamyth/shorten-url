import { Injectable, NotFoundException } from '@nestjs/common';
import type { ShortenURL, CreateShortenURLAJAXRequest } from './type';
import HashGenerator from 'short-unique-id';
import { DateUtil, ObjectUtil } from 'jamyth-web-util';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class V1Service {
  private readonly hashGenerator = new HashGenerator();
  private cacheTable: Record<string, ShortenURL> = {};

  @Cron('0 1 * * *')
  autoClearCache() {
    const now = Date.now();
    const list = ObjectUtil.toArray(this.cacheTable, (hash, config) => ({
      hash,
      ...config,
    }));

    list.forEach((_) => {
      const timestamp = _.expireAt.getTime();
      if (now > timestamp) {
        delete this.cacheTable[_.hash];
      }
    });
  }

  extractURL(hash: string) {
    const config: ShortenURL | undefined = this.cacheTable[hash];
    if (!config) {
      throw new NotFoundException('Invalid URL');
    }
    return config.url;
  }

  hash(request: CreateShortenURLAJAXRequest) {
    const url = request.url;
    const hash = this.hashGenerator.randomUUID();
    this.cacheTable[hash] = {
      url,
      expireAt: DateUtil.daysAfterToday(7, 'day-end'),
    };
    return hash;
  }

  clearCache(hash: string) {
    delete this.cacheTable[hash];
  }
}
