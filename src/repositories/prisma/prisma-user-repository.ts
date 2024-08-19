import { PrismaService } from "src/database/prisma.service";
import { UserRepository } from "../user-repositories";
import { Injectable } from "@nestjs/common";


@Injectable()
export class PrismaUserRepository implements UserRepository {
    constructor(private prisma: PrismaService) {
         
    }

    async create(name: string, email: string, password: string): Promise<void> {
        await this.prisma.user.create({
            data: {
                name,
                email,
                password
            }
        })
    }

    async findByEmail(email: string): Promise<any> {
        return this.prisma.user.findUnique({
          where: {
            email,
          },
        });
      }
    

} 