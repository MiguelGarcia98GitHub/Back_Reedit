import { HttpException, HttpStatus } from '@nestjs/common';

export class RegisterErrors {
  emailAlreadyExists() {
    return new HttpException(
      'The email you provided already exists',
      HttpStatus.CONFLICT,
    );
  }

  usernameAlreadyExists() {
    return new HttpException(
      'The username you provided already exists',
      HttpStatus.CONFLICT,
    );
  }
}

export class LoginErrors {
  emailNotFound() {
    return new HttpException('Email was not found', HttpStatus.NOT_FOUND);
  }

  passwordNotCorrect() {
    return new HttpException('Password does not match', HttpStatus.FORBIDDEN);
  }
}
