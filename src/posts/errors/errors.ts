import { HttpException, HttpStatus } from '@nestjs/common';

export class CreateErrors {
  userNotFound() {
    return new HttpException(
      'No user was found with that Id',
      HttpStatus.NOT_FOUND,
    );
  }

  communityNotFound() {
    return new HttpException(
      'No community was found with that Id',
      HttpStatus.NOT_FOUND,
    );
  }
}

export class GetPostsByCommunityIdErrors {
  communityNotFound() {
    return new HttpException(
      'No community was found with that Id',
      HttpStatus.NOT_FOUND,
    );
  }
}
