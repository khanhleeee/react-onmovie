import { Injectable } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class GenreService {
  async getGenres() {
    const result = await prisma.gENRES.findMany();
    console.log(result);
    return result;
  }

  // async getGenreById(id: number) {
  //   return await prisma.genre.findUnique({
  //     where: {
  //       id: id,
  //     },
  //   });
  // }

  // async createGenre(name: string) {
  //   return await prisma.genre.create({
  //     data: {
  //       name: name,
  //     },
  //   });
  // }

  // async updateGenre(id: number, name: string) {
  //   return await prisma.genre.update({
  //     where: {
  //       id: id,
  //     },
  //     data: {
  //       name: name,
  //     },
  //   });
  // }

  // async deleteGenre(id: number) {
  //   return await prisma.genre.delete({
  //     where: {
  //       id: id,
  //     },
  //   });
  // }
}
