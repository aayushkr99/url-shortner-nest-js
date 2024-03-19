import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Redirect,
    Req,
    UseGuards,
  } from '@nestjs/common';
  import { AuthGuard } from '@nestjs/passport';
  import { Request } from 'express';
  import { UrlService } from './url.service';
  import { UrlDto, UserId } from './dto';
  
  @Controller('url')
  export class UrlController {
    constructor(private readonly urlService: UrlService) {}
  
    @UseGuards(AuthGuard('jwt'))
    @Post('shorten')
    async shortenUrl(
      @Body() dto: UrlDto,
      @Req() req: Request & { user: UserId },
    ) {
      try {
        const shortenedUrl: string = await this.urlService.shortenUrl(
          dto.originalUrl,
          req.user.id,
        );
        const userId = req.user.id;
        const { headers } = req;
        const device_type = headers['user-agent'];
        await this.urlService.trackClick(
          shortenedUrl,
          userId,
          dto.ip,
          device_type,
          dto.os,
          dto.browser,
          dto.country,
          dto.city,
          dto.referrer,
        );
        return { shortenedUrl };
      } catch (err) {
        console.error(err);
        return { error: err.message };
      }
    }
  
    @Get('clicks')
      async getClicks() {
          return this.urlService.getClicks();
      }
  
    @UseGuards(AuthGuard('jwt'))
    @Get(':shortenedUrl')
    @Redirect()
    async redirectToOriginalUrl(
      @Param('shortenedUrl') shortenedUrl: string,
      @Req() req: Request & { user: UserId },
    ) {
      try {
        const originalUrl = await this.urlService.getOriginalUrl(
          shortenedUrl,
          req.user.id,
        );
        return { url: originalUrl };
      } catch (err) {
        console.error(err);
        return { url: '/error' };
      }
    }
  }
  