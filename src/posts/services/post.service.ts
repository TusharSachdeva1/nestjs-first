import { Injectable, NotFoundException } from "@nestjs/common";
import { Post } from "../interfaces/post.interface";
import fetchposts from "../config/posts.db";
@Injectable()
export class PostService {
    private posts : Post[] = []; 

    constructor() {
        fetchposts().then(posts => {
            this.posts = posts;
          });
    }

    create(CreatePostDto) {
        const post = {
          id : this.posts.length + 1,
          ...CreatePostDto
        }
        this.posts.push(post);
        return post;
    }

    findAll() {
        return this.posts;
    }

    find_post_with_id(id) {
        const postId = parseInt(id);
        const post = this.posts.find(p => p.id === postId);
        if (!post) {
        throw new NotFoundException('Post not found');
        }
        return post;
    }

    updatePost (id, UpdatePostDto) {
        const postIndex = this.posts.findIndex(p => p.id === id);
        if (postIndex === -1) {
          throw new NotFoundException('Post not found');
        }
        const updatedPost = { id: id, ...UpdatePostDto };
        this.posts[postIndex] = updatedPost;
        return updatedPost;
    }

    deletePost(id) {
        const postIndex = this.posts.findIndex(p => p.id === id);
        this.posts.splice(postIndex, 1)
        return 'Post deleted'
    }
}