import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ApiService } from './api.service'
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class Service {
  readonly urlOriginal = 'https://image.tmdb.org/t/p/original'
  genres: any[] = [];
  constructor(private http: HttpClient,
    private serviceApi: ApiService,
    private sanitizer: DomSanitizer,
  ) {
    this.serviceApi.getGenres().subscribe((genres) => {
      this.genres = genres['genres']
    });
  }
  setNameGenres(value: any) {
    value.genre_ids = value.genre_ids.map((genre, index) => {
      if (index < 3) {
        return this.genres.find(value => value.id === genre) || { name: "" }
      }
      else if (index === 3) {
        return { name: "..." }
      }
      return { name: "" }
    })
    value.backdrop_path = value.backdrop_path === null ? null : `url(${this.urlOriginal + value.backdrop_path})`
    value.poster_path = value.poster_path === null ? null : this.urlOriginal + value.poster_path
    value.title_original = value.title
    value.title = value.title.length > 16 ? value.title.slice(0, 16) + '...' : value.title

    return value;

  }
  setFilme(filmes) {

    filmes.map((filme) => {
      filme.title = filme.title || filme.name
      filme = this.setNameGenres(filme);
    })
    return filmes
  }
  setFilmeHeader(filmeHeader) {
    filmeHeader = filmeHeader.filter((value) => {
      return (value.backdrop_path !== null && value.genre_ids.length > 0)
    })[0]

    filmeHeader.title = filmeHeader.title || filmeHeader.name
    this.serviceApi.getVideo(filmeHeader.id).subscribe((video) => {
      let key = video['results'].find((value) => value.key !== undefined)?.key
      let title = filmeHeader.title
      filmeHeader.video = key === '' ? null : this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${key}?autoplay=1`);
      filmeHeader = this.setNameGenres(filmeHeader);
      filmeHeader.title = title
    })
    return filmeHeader
  }
  setFilmeDetail(filme) {
    filme.title = filme.title || filme.name
    this.serviceApi.getVideo(filme.id).subscribe((video) => {

      let key = video['results'][0]?.key
      filme.video = key === undefined ? null : this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${key}?autoplay=1`);
      filme.backdrop_path = filme.backdrop_path === null ? null : `url(${this.urlOriginal + filme.backdrop_path})`
      filme.poster_path = filme.poster_path === null ? null : this.urlOriginal + filme.poster_path
    })
    return filme
  }
  setProducao(producao) {

    let newProducao = { crew: producao.crew, cast: producao.cast, urlOriginal: this.urlOriginal }
    return newProducao
  }
}
