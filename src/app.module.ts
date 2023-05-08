import { Module } from '@nestjs/common';
import { PostModule } from './modules/app.postmodules';

@Module({
  imports: [PostModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
