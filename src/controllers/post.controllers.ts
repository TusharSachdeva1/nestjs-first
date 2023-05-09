import { Controller, Get, Post, Param, Put, Body, Delete, NotFoundException, UseGuards } from '@nestjs/common';
import fetchposts from 'src/config/posts.db';
import { CreatePostDto } from 'src/dto/post-dto/create-post.dto';
import { UpdatePostDto } from 'src/dto/post-dto/update-post.dto';
import { TokenGuard } from 'src/guards/auth.guard'; 
@Controller('posts')
export class PostsControllers {

  private posts: any[];

  constructor() {
    fetchposts().then(posts => {
      this.posts = posts;
    });
  }


// @DESC GETTING ALL THE POSTS 
// @ROUTE /posts
  @Get()
  @UseGuards(TokenGuard)
   findAll(): any[] {
    return this.posts;
  }

// @DESC GETTING A POST WITH AN ID
// @ROUTE /posts/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    const postId = parseInt(id);
    const post = this.posts.find(p => p.id === postId);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;

  }

// @DESC CREATING A NEW POST
// @ROUTE /posts
  @Post()
  create(@Body() CreatePostDto: CreatePostDto) {
    const post = {
      id : this.posts.length + 1,
      ...CreatePostDto
    }
    this.posts.push(post);
    return post;
  }

// @DESC UPDATING A POST WITH AN ID
// @ROUTE /posts/:id
  @Put(':id')
  update(@Param('id') id: string, @Body() UpdatePostDto: UpdatePostDto) {
    const postId = parseInt(id);
    const postIndex = this.posts.findIndex(p => p.id === postId);
    if (postIndex === -1) {
      throw new NotFoundException('Post not found');
    }
    const updatedPost = { id: postId, ...UpdatePostDto };
    this.posts[postIndex] = updatedPost;
    return updatedPost;
  }
    

// @DESC DELETING A POST WITH AN ID
// @ROUTE /posts/:id
  @Delete(':id')
  remove(@Param('id') id: string) {
    const postId = parseInt(id);
    const postIndex = this.posts.findIndex(p => p.id === postId);
    this.posts.splice(postIndex, 1)
    return 'Post deleted'
  }
}
