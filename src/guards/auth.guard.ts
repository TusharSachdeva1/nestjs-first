import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { UserControllers } from "src/controllers/user.controllers"

const userController = new UserControllers();
const users = userController.getUsers();

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
      return false;
    }
    try {
      const decoded = this.jwtService.verify(token);      
      const user = users.find((u) => u.id === decoded.id);
      if (!user) {
        return false;
      }
      request.user = user;
      return true;
    } catch (err) {
      return false;
    }
  }
}
