import { Injectable } from '@nestjs/common';

@Injectable()
export class CountryService {
  getHello(): string {
    return 'Get country';
  }
}
