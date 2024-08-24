import { PrismaService } from 'src/database/prisma.service';
import { Transaction, User, UserRepository } from '../user-repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(name: string, email: string, password: string): Promise<void> {
    await this.prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async editing(
    id: number,
    name: string,
    email: string,
    password: string,
  ): Promise<User> {
    return this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name,
        email,
        password,
      },
    });
  }

  async selectCategories(): Promise<any> {
    return await this.prisma.category.findMany();
  }

  async transactionAdd(
    descricao: string,
    valor: number,
    data: Date,
    tipo: string,
    usuario_id: number,
    categoria_id: number,
  ): Promise<Transaction> {
    return await this.prisma.transaction.create({
      data: {
        descricao,
        valor,
        data,
        tipo,
        usuario: {
          connect: { id: usuario_id },
        },
        categoria: {
          connect: { id: categoria_id },
        },
      },
    });
  }

  async transactionEdit(
    id: number,
    descricao: string,
    valor: number,
    data: Date,
    tipo: string,
    categoriaId: number,
  ): Promise<Transaction> {
    return await this.prisma.transaction.update({
      where: {
        id: id,
      },
      data: {
        descricao,
        valor,
        data,
        tipo,
        categoria: {
          connect: {
            id: categoriaId,
          },
        },
      },
    });
  }

  async findById(id: number): Promise<any> {
    await this.prisma.category.findUnique({
      where: {
        id,
      },
    });
  }

  async findTransactionById(id: number): Promise<Transaction> {
    return await this.prisma.transaction.findUnique({
      where: {
        id,
      },
    });
  }

  async findManyById(userId: number): Promise<Transaction[]> {
    return await this.prisma.transaction.findMany({
      where: {
        usuario_id: userId,
      },
    });
  }

  async deleteTransaction(id: number): Promise<void> {
    await this.prisma.transaction.delete({
      where: {
        id: id,
      },
    });
  }
}
