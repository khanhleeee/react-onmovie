import { Module } from '@nestjs/common';
import { GenreController } from 'src/controllers/genre.controller';
import { GenreService } from 'src/services/genre.service';

@Module({
  controllers: [GenreController],
  providers: [GenreService]
})
export class GenreModule {}
