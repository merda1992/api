import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as jwt from 'jsonwebtoken';

const secretKey = 'secretKey';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context) {
    const req = context.switchToHttp().getRequest();
    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader) {
      throw new UnauthorizedException('Missing authorization header');
    }

    const token = authorizationHeader.replace('Bearer ', '');
    try {
      const decoded = jwt.verify(token, secretKey);
      req.user = decoded;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }

    return super.canActivate(context);
  }
}