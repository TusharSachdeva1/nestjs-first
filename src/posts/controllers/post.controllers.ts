import { Controller, Get, Post, Param, Put, Body, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { CreatePostDto } from 'src/posts/dto/post-dto/create-post.dto';
import { UpdatePostDto } from 'src/posts/dto/post-dto/update-post.dto';
import { TokenGuard } from '../../guards/auth.guard';
import { PostService } from '../services/post.service';
@Controller('posts')
export class PostsControllers {
 
  constructor(private postservice : PostService) {}


// @DESC GETTING ALL THE POSTS 
// @ROUTE /posts
  @Get()
  @UseGuards(TokenGuard)
   findAll(): any[] {
    return this.postservice.findAll();
  }

// @DESC GETTING A POST WITH AN ID
// @ROUTE /posts/:id
  @Get(':id')
  @UseGuards(TokenGuard)
  findOne(@Param('id') id: string) {
    return this.postservice.find_post_with_id(id);
  }

// @DESC CREATING A NEW POST
// @ROUTE /posts
  @Post()
  @UseGuards(TokenGuard)
  create(@Body() CreatePostDto: CreatePostDto) {
    return this.postservice.create(CreatePostDto);
  }

// @DESC UPDATING A POST WITH AN ID
// @ROUTE /posts/:id
  @Put(':id')
  @UseGuards(TokenGuard)
  update(@Param('id', ParseIntPipe) id: number, @Body() UpdatePostDto: UpdatePostDto) {
    return this.postservice.updatePost(id, UpdatePostDto);
  }
    

// @DESC DELETING A POST WITH AN ID
// @ROUTE /posts/:id
  @Delete(':id')
  @UseGuards(TokenGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.postservice.deletePost(id);
  }
}
