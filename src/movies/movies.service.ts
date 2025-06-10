import { Injectable, NotAcceptableException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
@Injectable()
export class MoviesService {
  private filePath = join(__dirname, '../../../movies-250.json');

  private readMovies() {
    const data = readFileSync(this.filePath, 'utf-8');
    return JSON.parse(data).movies;
  }

  private writeMovies(movies) {
    const data = JSON.stringify({ date: new Date().toISOString(), movies }, null, 2);
    writeFileSync(this.filePath, data, 'utf-8');
  }

  findAll() {
    return this.readMovies();
  }

  findOne(imdbID: string) {
    const movie = this.readMovies().find(m => m.imdbID === imdbID);
    if (!movie) throw new NotFoundException('Movie not found');
    return movie;
  }

  create(movie) {
    const movies = this.readMovies();
    movies.push(movie);
    this.writeMovies(movies);
    return movie;
  }

  update(imdbID: string, updateData) {
    const movies = this.readMovies();
    const idx = movies.findIndex(m => m.imdbID === imdbID);
    if (idx === -1) throw new NotFoundException('Movie not found');
    movies[idx] = { ...movies[idx], ...updateData };
    this.writeMovies(movies);
    return movies[idx];
  }

  remove(imdbID: string) {
    let movies = this.readMovies();
    const idx = movies.findIndex(m => m.imdbID === imdbID);
    if (idx === -1) throw new NotFoundException('Movie not found');
    movies.splice(idx, 1);
    this.writeMovies(movies);
    return { deleted: true };
  }
  
  /* create(createMovieDto: CreateMovieDto) {
    return 'This action adds a new movie';
  }

  findAll() {
    return `This action returns all movies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} movie`;
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
 */}
