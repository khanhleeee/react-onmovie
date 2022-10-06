import { Controller, Get } from '@nestjs/common';
import { GenreService } from 'src/services/genre.service';

@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get()
  async getGenre() {
    return this.genreService.getGenres();
  }
}
