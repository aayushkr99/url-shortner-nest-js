import { ConsoleLogger, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
const Redis = require('ioredis');
import { PrismaService } from 'src/prisma/prisma.service';
import * as crypto from 'crypto';

@Injectable()
export class UrlService extends PrismaClient {
  private redisClient = new Redis({
    host: 'localhost',
    port: 6379,
  });
  constructor(private readonly prismaService: PrismaService) {
    super({
      datasources: {
        db: { url: process.env.DATABASE_URL },
      },
    });
  }

  async shortenUrl(originalUrl: string, userId: number): Promise<string> {
    try {

    //   const cachedShortenedUrl = await this.getFromCache(originalUrl);
    //   if (cachedShortenedUrl) {
    //       console.log('Retrieved shortened URL from cache:', cachedShortenedUrl);
    //       return cachedShortenedUrl;
    //   }

      const shortenedUrl = await this.generateShortenedUrl(originalUrl, userId);
      await this.cacheUrl(originalUrl, shortenedUrl);
      console.log({shortenedUrl})

      return shortenedUrl;
    } catch (err) {
      console.error('Error shortening URL:', err);
      throw new Error('Error shortening URL');
    }
  }

  private async getFromCache(originalUrl: string): Promise<string | null> {
    const data = await this.redisClient.get(originalUrl);
    console.log("data from redis ->", data, originalUrl)
    return data ;
  }

  private async cacheUrl(
    originalUrl: string,
    shortenedUrl: string,
  ): Promise<void> {
    const data = await this.redisClient.set(shortenedUrl,originalUrl);
    console.log(`Cached ${originalUrl}:${shortenedUrl}`);
  }

  private async generateShortenedUrlCode(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const randomString = Array.from(crypto.randomFillSync(new Uint8Array(length)))
        .map((byte) => characters[byte % characters.length])
        .join('');
    return randomString;
}

  private async generateShortenedUrl(
    originalUrl: string,
    userId: number,
  ): Promise<string> {
    try {
      const generatedShortenedUrl = await this.generateShortenedUrlCode(5);

      const createdUrl = await this.prismaService.url.create({
        data: {
          original_url: originalUrl,
          short_url: generatedShortenedUrl,
          user: { connect: { id: userId } },
        },
      });

      return createdUrl.short_url;
    } catch (err) {
      console.error('Error generating shortened URL:', err);
      throw new Error('Error generating shortened URL');
    }
  }

  async getOriginalUrl(shortenedUrl: string, userID: number): Promise<string> {

    const cachedOriginalUrl = await this.getFromCache(shortenedUrl);

    if (cachedOriginalUrl) {
        return cachedOriginalUrl;
    }

    const url = await this.prismaService.url.findFirst({
      where: { short_url: shortenedUrl, userID },
      select: { original_url: true },
    });

    if (!url) {
      throw new NotFoundException('Original URL not found: forbidden');
    }

    return url.original_url;
  }

  async getClicks(): Promise<any[]> {
    return this.prismaService.click.findMany({
        include: {
            url: {
                include: {
                    user: true
                }
            }
        }
    });
}

  async trackClick(
    shortenedUrl: string,
    userId: number, ip:string,device_type:string, os:string,browser:string, country:string, city:string, referrer:string
  ): Promise<void> {
    const url = await this.prismaService.url.findFirst({
      where: { short_url: shortenedUrl, userID : userId },
    });

    if (!url) {
      throw new NotFoundException('Shortened URL not found');
    }
    await this.prismaService.click.create({
      data: {
        urlID: url.id,
        ip,
        device_type,
        os,
        browser,
        country,
        city,
        referrer,
      },
    });
  }
}
