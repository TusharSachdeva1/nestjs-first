import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/services/user.services';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(@Inject(JwtService) private readonly jwtService: JwtService,
              @Inject(UserService) private userService : UserService
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
      return false;
    }
    try {
      const users = this.userService.findAll();
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
