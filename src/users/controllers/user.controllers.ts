import { Controller, Get, Post, Param, Put, Body, Delete, NotFoundException, ParseIntPipe, UseGuards } from '@nestjs/common';
import fetchusers from 'src/users/config/users.db';
import { CreateUserDto } from 'src/users/dto/users-dto/create-users.dto';
import { UpdateUserDto } from 'src/users/dto/users-dto/update-users.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../services/user.services';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';

@Controller('users')
@UseGuards(ThrottlerGuard) 
export class UserControllers {
 
  

  constructor(private userService : UserService){}

// @DESC GETTING ALL THE USERS 
// @ROUTE /users
  @Get()
   findAll(): any[] {
    return this.userService.findAll();
  }

// @DESC GETTING A USER WITH AN ID
// @ROUTE /users/:id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.find_user_with_id(id);
  }

// @DESC CREATING A NEW USER
// @ROUTE /users
  @Post()
  create(@Body() CreateUserDto: CreateUserDto) {
    return this.userService.create(CreateUserDto);
  }

// @DESC UPDATING A USER WITH AN ID
// @ROUTE /users/:id
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() UpdateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, UpdateUserDto);
  }
    

// @DESC DELETING A USER WITH AN ID
// @ROUTE /users/:id
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }
}
