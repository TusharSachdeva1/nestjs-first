import { Module } from '@nestjs/common';
import { PostModule } from './posts/modules/app.postmodules';
import { UserModule } from './users/modules/app.usermodule';
import { JwtModule } from '@nestjs/jwt';
import { TokenGuard } from './guards/auth.guard';

@Module({
  imports: [ 
              JwtModule.register({
                secret: 'ABC123', 
                signOptions: { expiresIn: '1h' },
              }),
              PostModule,
              UserModule
            ],
  controllers: [],
  providers: [TokenGuard],
})
export class AppModule {}
