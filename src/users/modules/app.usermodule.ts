import { Module } from '@nestjs/common';
import { UserControllers } from '../controllers/user.controllers';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../services/user.services';
@Module({
  imports : [JwtModule.register({
              secret: 'ABC123', 
              signOptions: { expiresIn: '1h' },
            })],
  controllers: [UserControllers],
  providers: [UserService],
  exports : [UserService]
})
export class UserModule {}
