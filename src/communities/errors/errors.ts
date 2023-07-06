import { HttpException, HttpStatus } from '@nestjs/common';

export class CreateErrors {
  userNotFound() {
    return new HttpException(
      'No user was found with that Id',
      HttpStatus.NOT_FOUND,
    );
  }

  nameAlreadyExists() {
    return new HttpException(
      'A community with this name already exists',
      HttpStatus.CONFLICT,
    );
  }
}

export class GetCreatedCommunitiesByUserErrors {
  userNotFound() {
    return new HttpException(
      'No user was found with that Id',
      HttpStatus.NOT_FOUND,
    );
  }
}
