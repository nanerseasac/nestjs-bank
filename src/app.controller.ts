
import { Body, Controller, Get, Post, UnauthorizedException  } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { createUserBody } from './dtos/create-user-body';
import { UserRepository } from './repositories/user-repositories';
import * as bcrypt from 'bcrypt';

@Controller()
export class AppController {
  constructor(private userRepository: UserRepository) {}

  @Post('register')
  async add_user(@Body() body: createUserBody) {
    const { email, name, password } = body

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.userRepository.create(name, email, hashedPassword);
    return { message: 'User created successfully!' };
  }

  @Post('login')
  async login(@Body() body: any) {
    const { email, password } = body 
      const user: any = await this.userRepository.findByEmail(email);

      if(!user) {
          throw new UnauthorizedException('Invalid email or password');
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        throw new UnauthorizedException('Invalid email or password');
      }

      return { message: 'Login successful' };
  }


  @Get('right')
  getHi(@Body() body: any) {
    console.log(body)
    return 'Hi';
  }
}