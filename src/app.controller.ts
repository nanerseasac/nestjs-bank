
import { Body, Controller, Get, Post, Put, Req, UnauthorizedException  } from '@nestjs/common';
import { createUserBody } from './dtos/create-user-body';
import { UserRepository } from './repositories/user-repositories';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { jwtPw } from './config/jwtpw';


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

      const token = jwt.sign({ id: user.id }, jwtPw, { expiresIn: '1h' });

      const { password: _, ...userLoggedIn} = user;

      return { message: {user: userLoggedIn, token}};
  }


  @Get('user')
  userProfile(@Req() req: Request) {
    
    return req['usuario']
  }

  @Put('user')
  async editProfile(@Req() req: Request
  , @Body() body: {name?: string, email?: string, password?: string}) {
    const { id } = req['usuario']
    
    const { name, email, password } = body;
    
    const emailIsTaken = await this.userRepository.findByEmail(email)

    if(email === emailIsTaken) {
      return { message: "Email is taken"}
    }

    if (!name && !email && !password) {
      return { message: 'No fields to update' };
    }

    if(password) {
      body.password = await bcrypt.hash(password,10)
    }

    try {
      const updatedUser = await this.userRepository.editing(id,name,email,body.password)

      return updatedUser
    } catch (error) {
      if (error.code === 'P2002') {
        throw new UnauthorizedException('Email is already taken');
      }
      throw new Error('Failed to update profile');
    }
  }
}