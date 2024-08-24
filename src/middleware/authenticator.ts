import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from '../database/prisma.service';
import { jwtPw } from '../config/jwtpw';

@Injectable()
export class VerifyUserAccMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new UnauthorizedException('Unauthorized');
    }

    const token = authorization.split(' ')[1];

    try {
      const { id } = jwt.verify(token, jwtPw);

      const user = await this.prisma.user.findUnique({
        where: { id: parseInt(id, 10) },
      });

      if (!user) {
        throw new UnauthorizedException('Unauthorized');
      }
      req['usuario'] = { id: user.id, email: user.email, name: user.name };

      next();
    } catch (error) {
      throw new UnauthorizedException('Unauthorized');
    }
  }
}
