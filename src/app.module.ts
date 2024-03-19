import { Module } from '@nestjs/common';
// import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UrlModule } from './url/url.module';



@Module({
  imports: [AuthModule, UrlModule],
})
export class AppModule {}
