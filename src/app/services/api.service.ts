import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { tap, delay, take } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly url = 'https://api.themoviedb.org/3/'
  private readonly apiKey = 'c3ea08f379bbc9b580a3ccbd5343e673'
  private readonly currentDate = new Date().getFullYear()
  page = 0;
  private query = '';
  private readonly categories = {
    movie: [{ title: "Em cartaz", value: "now_playing" }, {
      title: "Populares",
      value: "popular"
    },
    {
      title: "Próximas estreias",
      value: "upcoming"
    },
    { title: "Mais bem avaliados", value: "top_rated" }],
    series: [{ title: "Em exibição hoje", value: "airing_today" }, {
      title: "Populares",
      value: "popular"
    },
    {
      title: "Na tv",
      value: "on_the_air"
    },

    { title: "Mais bem avaliados", value: "top_rated" }]
  }

  options: any[] = [{ title: "Filmes", value: "movie", categories: this.categories.movie },
  { title: "Séries", value: "tv", categories: this.categories.series }]

  valueSelected = { option: this.options[0], category: 'popular' };
  constructor(private http: HttpClient) {
  }
  setOption(option: any) {
    this.page = 0;
    this.valueSelected.option = option
  }
  setCategory(category) {
    this.page = 0;

    this.valueSelected.category = category
  }

  getMovies() {
    return this.http.get<any[]>(`${this.url}${this.valueSelected.option.value}/${this.valueSelected.category}?page=${++this.page}&api_key=${this.apiKey}&language=pt-br`).pipe(
      delay(1000), take(1)
      // , tap(console.log)
    );
  }
  getGenres() {
    return this.http.get<any[]>(`${this.url}genre/${this.valueSelected.option.value}/list?api_key=${this.apiKey}&language=pt-br`).pipe(take(1)
    );
  }
  searchMovies(query, load) {
    if (query === "") {
      this.page = 0;
      return this.getMovies();
    }

    if ((query === this.query || this.query === "") && load)
      this.page++
    else {
      this.page = 1;
      this.query = "";
    }
    this.query = query
    return this.http.get<any[]>(`${this.url}search/${this.valueSelected.option.value}?api_key=${this.apiKey}&query=${query}&page=${this.page}&language=pt-br`).pipe(
      delay(1000), take(1)
    );
  }
  getMoviesUpcoming() {
    return this.http.get<any[]>(`${this.url}discover/${this.valueSelected.option.value}?api_key=${this.apiKey}&sort_by=popularity.desc&page=${1}&year=${this.currentDate}&language=pt-br`).pipe(
      delay(1000), take(1)
      // , tap(console.log)
    );
  }
  getVideo(id: any) {
    return this.http.get<any[]>(`${this.url}${this.valueSelected.option.value}/${id}/videos?api_key=${this.apiKey}`).pipe(take(1)
    );
  }
  getDetail(id: any) {
    return this.http.get<any[]>(`${this.url}${this.valueSelected.option.value}/${id}?api_key=${this.apiKey}&language=pt-br`).pipe(take(1)
    );
  }
  getCredits(id: any) {
    return this.http.get<any[]>(`${this.url}${this.valueSelected.option.value}/${id}/credits?api_key=${this.apiKey}`).pipe(
      );
  }
  getRecommendations(id: any) {
    return this.http.get<any[]>(`${this.url}${this.valueSelected.option.value}/${id}/recommendations?api_key=${this.apiKey}`).pipe(
      );
  }
}
