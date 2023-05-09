import { Module } from '@nestjs/common';
import { PostModule } from './modules/app.postmodules';
import { UserModule } from './modules/app.usermodule';
import { JwtModule } from '@nestjs/jwt';
import { TokenGuard } from './guards/auth.guard';
@Module({
  imports: [ JwtModule.register({
                secret: 'your_secret_key_here', // replace with your own secret key
                signOptions: { expiresIn: '1h' }, // optional, set token expiration time
              }),
              PostModule, UserModule],
  controllers: [],
  providers: [TokenGuard],
})
export class AppModule {}
