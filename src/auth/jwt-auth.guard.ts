import {
  Injectable,
  UnauthorizedException,
  ExecutionContext,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as jwt from 'jsonwebtoken';
import { GqlExecutionContext } from '@nestjs/graphql';

const secretKey = 'my-secret-key';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

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

     return ctx.getContext().req;
  }
}
