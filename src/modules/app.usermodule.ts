import { Module } from '@nestjs/common';
import { UserControllers} from 'src/controllers/user.controllers'

@Module({
  controllers: [UserControllers],
  providers: [],
})
export class UserModule {}
