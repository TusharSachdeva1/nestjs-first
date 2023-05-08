
import { Module } from '@nestjs/common';
import { PostsControllers } from 'src/controllers/post.controllers';

@Module({
  controllers: [PostsControllers],
  providers: [],
})
export class PostModule {}
