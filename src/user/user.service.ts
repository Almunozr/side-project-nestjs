import { HttpCode, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { NotFoundError } from 'rxjs';


@Injectable()
export class UserService {
  constructor( private prisma: PrismaService){}

  async createUser(body: CreateUserDto) { //Autenticación de usuario
    try {
      const salts = await bcrypt.genSalt(10);// Genera un salt para el hash, es decir, una cadena aleatoria que se utiliza para fortalecer el hash de la contraseña.
      const hash = await bcrypt.hash(body.password, salts); // Crea un hash de la contraseña utilizando el salt generado.
      const newUser = await this.prisma.user.create({data: {username: body.username, password: hash}}); // Crea un nuevo usuario en la base de datos utilizando Prisma, pasando el nombre de usuario y la contraseña hasheada.
      //Destructuración para no enviar el password al 
      const { password, ...result } = newUser; // Desestructura el nuevo usuario para eliminar la contraseña del objeto resultante.
      return result; // Devuelve el nuevo usuario sin la contraseña.
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error creating user: ${error.message}`);
      }
      
    }
  }

  async findOneUser(username:string){
    try{
      const user = await this.prisma.user.findFirst({ where: { username } });
      if(user)return user;
      return null;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error finding user: ${error.message}`);
    }
  }
}

  async getUserId(id: string) {
    try {
      const user = await this.prisma.user.findFirst({ where: { id } });
      if (!user) throw new NotFoundError(`User with ID ${id} not found`);
      console.log(user);
      const { password, ...result } = user; // Destructure to remove password from the result
      return result;
    } catch (error) {
      if (error instanceof NotFoundError) throw new NotFoundError(`User with ID ${id} not found`);
      if (error instanceof Error) {
        throw new Error(`Error finding user by ID: ${error.message}`);
      }
    }

  }



  create(createUserDto: CreateUserDto) {


    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
