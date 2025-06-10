import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { LocalStrategy } from './strategy/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { SECRET } from '../../jwt-key'; // Importa tus constantes JWT desde el archivo correspondiente
import { JwtStrategy } from './strategy/jwt.strategy';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [PassportModule,JwtModule.register({
      secret: SECRET,
      signOptions: { expiresIn: '8h' },
    }),],
  controllers: [AuthController],
  providers: [AuthService, UserService,LocalStrategy, JwtStrategy,PrismaService],// Import UserService to use it in AuthService
})
export class AuthModule {}
