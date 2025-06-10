import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-autgard';


@UseGuards(JwtAuthGuard)
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @Get(':imdbID')
  findOne(@Param('imdbID') imdbID: string) {
    return this.moviesService.findOne(imdbID);
  }

  @Post()
  create(@Body() movie) {
    return this.moviesService.create(movie);
  }

  @Put(':imdbID')
  update(@Param('imdbID') imdbID: string, @Body() updateData) {
    return this.moviesService.update(imdbID, updateData);
  }

  @Delete(':imdbID')
  remove(@Param('imdbID') imdbID: string) {
    return this.moviesService.remove(imdbID);
  }
}
