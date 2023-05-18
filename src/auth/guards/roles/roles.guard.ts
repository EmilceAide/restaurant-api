import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { ROLES_KEY } from '../../decorators/roles.decorator';
import { PayloadToken } from 'src/auth/models/token.model'; 
import { Role } from 'src/auth/models/roles.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles: Role[] = this.reflector.get(ROLES_KEY, context.getHandler()); 
    //['admin', 'super-admin']
    if(!roles){
      return true; 
    }
    const request = context.switchToHttp().getRequest(); 
    const user = request.user as PayloadToken;
    //{ role: 'admin', sub: ''}
    const isAuth = roles.some((role) => role === user.role); 
    if(!isAuth) {
      throw new UnauthorizedException('your role is wrong'); 
    }
    return isAuth;
  }
}
