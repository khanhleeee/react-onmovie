import { Body, Controller, Get } from '@nestjs/common';
import { CountryService } from '../services/country.service';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  getHello(): string {
    return this.countryService.getHello();
  }
}
