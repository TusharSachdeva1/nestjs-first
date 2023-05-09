import { Controller, Get, Post, Param, Put, Body, Delete, NotFoundException } from '@nestjs/common';
import fetchusers from 'src/config/users.db';
import { CreateUserDto } from 'src/dto/users-dto/create-users.dto';
import { UpdateUserDto } from 'src/dto/users-dto/update-users.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('users')
export class UserControllers {

  private users: any[];

  constructor(private readonly jwtService: JwtService){
    fetchusers().then(users => {
      this.users = users;
    });
  }

  getUsers() : any[] {
    return this.users;
  }
// @DESC GETTING ALL THE USERS 
// @ROUTE /users
  @Get()
   findAll(): any[] {
    return this.users;
  }

// @DESC GETTING A USER WITH AN ID
// @ROUTE /users/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    const userId = parseInt(id);
    let user = this.users.find(u => u.id === userId);
    const token = this.jwtService.sign({ id: user.id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user = {
      token,
      ...user,
    }
    return user;

  }

// @DESC CREATING A NEW USER
// @ROUTE /users
  @Post()
  create(@Body() CreateUserDto: CreateUserDto) {
    // const token = this.jwtService.sign({ id: user.id });
    const user = {
      id : this.users.length + 1,
      // token,
      ...CreateUserDto
    };
    this.users.push(user);
    return user;
  }

// @DESC UPDATING A USER WITH AN ID
// @ROUTE /users/:id
  @Put(':id')
  update(@Param('id') id: string, @Body() UpdateUserDto: UpdateUserDto) {
    const userId = parseInt(id);
    const userIndex = this.users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      throw new NotFoundException('User not found');
    }
    const updatedUser = { id: userId, ...UpdateUserDto };
    this.users[userIndex] = updatedUser;
    return updatedUser;
  }
    

// @DESC DELETING A USER WITH AN ID
// @ROUTE /users/:id
  @Delete(':id')
  remove(@Param('id') id: string) {
    const userId = parseInt(id);
    const userIndex = this.users.findIndex(u => u.id === userId);
    this.users.splice(userIndex, 1)
    return 'User deleted'
  }
}
