import { Module } from '@nestjs/common';
import { UserControllers } from '../controllers/user.controllers';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../services/user.services';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
@Module({
  imports : [
              JwtModule.register({
                secret: 'ABC123', 
                signOptions: { expiresIn: '1h' },
              }),
              ThrottlerModule.forRoot({
                ttl: 120,
                limit: 20,
              })
            ],
  controllers: [UserControllers],
  providers: [
                UserService,
                ThrottlerGuard,
                {
                  provide: APP_GUARD,
                  useClass: ThrottlerGuard
                }
              ],
  exports : [UserService]
})
export class UserModule {}
