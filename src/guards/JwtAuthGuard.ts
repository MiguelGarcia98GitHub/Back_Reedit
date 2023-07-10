import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JwtAuthGuardErrors } from './errors/errors';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1];

    if (!token) {
      throw new JwtAuthGuardErrors().JwtNotFound();
    }

    try {
      // Decode the token and attach it to the request object
      request.user = jwt.verify(token, process.env.jwt_secret_encryption_key);
    } catch (err) {
      throw new JwtAuthGuardErrors().JwtNotValid();
    }

    return true;
  }
}
