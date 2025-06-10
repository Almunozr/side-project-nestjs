import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [AuthModule, UserModule, JwtModule, MoviesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, AuthService, UserService],
})
export class AppModule {}
