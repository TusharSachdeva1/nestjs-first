import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "../interfaces/user.interface";
import fetchusers from "../config/users.db";
import { JwtService } from "@nestjs/jwt";
@Injectable()
export class UserService {
    private users : User[] = [];

    constructor(private jwtService : JwtService) {
        fetchusers().then(user => {
            this.users = user;
          });
    }

    create(CreateUserDto) {
        const user = {
          id : this.users.length + 1,
          ...CreateUserDto
        }
        this.users.push(user);
        return user;
    }

    findAll() {
        return this.users;
    }

    find_user_with_id(id) {
        let user = this.users.find(u => u.id === id);
        const token = this.jwtService.sign({ id: user.id });
        if (!user) {
        throw new NotFoundException('User not found');
        }
        user.token = token;
        return user;
    }

    updateUser (id, UpdateUserDto) {
        const userIndex = this.users.findIndex(u => u.id === id);
        if (userIndex === -1) {
          throw new NotFoundException('User not found');
        }
        const updatedUser = { id: id, ...UpdateUserDto };
        this.users[userIndex] = updatedUser;
        return updatedUser;
    }

    deleteUser(id) {
        const userIndex = this.users.findIndex(u => u.id === id);
        this.users.splice(userIndex, 1)
        return 'User deleted'
    }
}