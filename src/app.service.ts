import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  serverOnline(): string {
    return 'Reedit Backend Online!';
  }
}
