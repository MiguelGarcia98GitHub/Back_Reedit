import { HttpException, HttpStatus } from '@nestjs/common';

export class JwtAuthGuardErrors {
  JwtNotFound() {
    return new HttpException('No JWT was found', HttpStatus.UNAUTHORIZED);
  }

  JwtNotValid() {
    return new HttpException('JWT is not valid', HttpStatus.UNAUTHORIZED);
  }
}
