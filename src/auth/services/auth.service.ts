import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'; 
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../../users/services/users.service';
import { User } from 'src/users/entities/user.entity';
import { PayloadToken } from '../models/token.model';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService){}

async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return null;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch ? user : null;
  }

  generateJWT(user: User) {
    const payload: PayloadToken = {role: user.role, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    }
  }
}