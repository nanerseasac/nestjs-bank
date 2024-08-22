
import { Body, Controller, Get, Param, Post, Put, Req, UnauthorizedException  } from '@nestjs/common';
import { createUserBody } from './dtos/create-user-body';
import { UserRepository } from './repositories/user-repositories';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { jwtPw } from './config/jwtpw';
import { createTransactionBody } from './dtos/create-transaction-body';
import { updateTransactionBody } from './dtos/update-transaction-body';


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
    

    try {

    const emailIsTaken = await this.userRepository.findByEmail(email)

    if(emailIsTaken) {
      return { message: "Email is already taken"}
    }

    if (!name && !email && !password) {
      return { message: 'No fields to update' };
    }

    if(password) {
      body.password = await bcrypt.hash(password,10)
    }
      const updatedUser = await this.userRepository.editing(id,name,email,body.password)

      return updatedUser
    } catch (error) {
      throw new Error('Failed to update profile');
    }
  }

  @Get('categories')
    async getCategories() {
      try {
        return await this.userRepository.selectCategories()
      } catch (error) {
        throw new Error('Failed to get categories');
      }
    }

  @Post('transaction')
    async addTransaction(@Req() req: Request,
      @Body() body: createTransactionBody) {
      const { descricao, valor, data, tipo, categoriaId} = body
      const { id } = req['usuario']

      try {
        const newTransaction = await this
        .userRepository
        .transactionAdd(descricao, valor, data, tipo, id, categoriaId)

        

        return newTransaction

      } catch (error) {
        console.log(error)
        throw new Error('Failed to create transcation');
      }
    }

    @Get('transaction')
      async getTransactions(@Req() req: Request) {
        const { id } = req['usuario']

        try {
        const transactions = await this.userRepository.findManyById(id)

        

        return transactions
        } catch (error) {
          console.log(error)
          throw new Error('Failed to find transcation');
        }
      }

      @Put('transaction/:id')
  async updateTransaction(
    @Param('id') id: string,
    @Req() req: Request,
    @Body() body: updateTransactionBody,
  ) {
    const { usuario_id } = req['usuario'];
    const { descricao, valor, data, tipo, categoriaId } = body;

    try {
      const transactions = await this.userRepository.findManyById(parseInt(id, 10));
      
      if (!transactions) {
        return { 
          statusCode: 404, 
          message: "Transaction not found, please ensure that you insert the right id" 
        };
      }

  
      const updateTransaction = await this.userRepository.transactionEdit(
        parseInt(id, 10),
        descricao,
        valor,
        data,
        tipo,
        categoriaId
      );

      return {
        statusCode: 201,
        message: "Transaction updated successfully",
        data: updateTransaction,
      };
    } catch (error) {
      console.error('Failed to update transaction', error);
      throw new Error('Internal Error');
    }
  }
}


