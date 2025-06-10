import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './user';
import { JwtService } from '@nestjs/jwt';
import { PayloadEntity } from './payload';
import { JwtModule } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(private userService: UserService,
    private jwtService: JwtService) {}

  async validateUser(body: CreateUserDto) {
    try {
      const user = await this.userService.findOneUser(body.username);//valida que el usuario exista
      if (user) {
        const matchResult = await bcrypt.compare(body.password, user?.password ?? ""); // Compara la contraseña proporcionada con la almacenada en la base de datos
        if( matchResult) {
          // Destructuración para no enviar el password al cliente
          const { password, ...result } = user; // Elimina la contraseña del objeto resultante
          return result; // Devuelve el usuario sin la contraseña
        }
      }
      return null; // Retorna null si no se encuentra el usuario
    } catch (error) {
      throw new Error(`Error validating user: ${error.message}`);
    }
  }

  login(user: UserEntity) {
    const payload: PayloadEntity = { username: user.username, sub: user.id }; 
    return {
      access_token: this.jwtService.sign(payload),
    };
  }


  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
