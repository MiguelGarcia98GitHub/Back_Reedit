import { HttpException, HttpStatus } from '@nestjs/common';

export class CreateErrors {
  userNotFound() {
    return new HttpException(
      'No user was found with that Id',
      HttpStatus.NOT_FOUND,
    );
  }

  postNotFound() {
    return new HttpException(
      'No post was found with that Id',
      HttpStatus.NOT_FOUND,
    );
  }
}

export class GetCommentsByPostIdErrors {
  postNotFound() {
    return new HttpException(
      'No post was found with that Id',
      HttpStatus.NOT_FOUND,
    );
  }
}
