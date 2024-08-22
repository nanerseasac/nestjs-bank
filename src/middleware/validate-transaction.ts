import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { PrismaService } from '../database/prisma.service';


@Injectable()
export class ValidateTransaction implements NestMiddleware {
  constructor(private prisma: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { categoria_id } = req.body;

    if (categoria_id < 1 &&  categoria_id > 17) {
        return { message: 'category_id number is invalid'}
    }
    next()
}

}