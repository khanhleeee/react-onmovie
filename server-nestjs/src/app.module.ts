import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CountryModule } from './modules/country.module';
import { GenreModule } from './modules/genre.module';

@Module({
  imports: [CountryModule, GenreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
