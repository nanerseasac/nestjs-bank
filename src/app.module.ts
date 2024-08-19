import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './database/prisma.service';
import { UserRepository } from './repositories/user-repositories';
import { PrismaUserRepository } from './repositories/prisma/prisma-user-repository';
import { VerifyUserAccMiddleware } from './middleware/authenticator';
// import { AppService } from './app.service';



@Module({
  imports: [],
  controllers: [AppController],
  providers: [PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository
    }
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyUserAccMiddleware).forRoutes(
      'user',
      'category',
      'transaction',
      'transaction/statement'
    )
  }
}
