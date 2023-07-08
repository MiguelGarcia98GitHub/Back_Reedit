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

export class GetCommunityByCommunityNameErrors {
  nameNotFound() {
    return new HttpException(
      'No community was found with that name',
      HttpStatus.NOT_FOUND,
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
