
import { Module } from '@nestjs/common';
import { PostsControllers } from '../controllers/post.controllers';
import { JwtModule } from '@nestjs/jwt';
import { PostService } from '../services/post.service';
import { UserService } from 'src/users/services/user.services';
@Module({
  imports : [JwtModule.register({
              secret: 'ABC123', 
              signOptions: { expiresIn: '1h' },
            })],
  controllers: [PostsControllers],
  providers: [PostService, UserService],
})
export class PostModule {}
