import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class MyService {
  constructor(private readonly jwtService: JwtService) {}
}
