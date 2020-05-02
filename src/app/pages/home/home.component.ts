import { Component, OnInit, Input } from "@angular/core";
import { ApiService } from 'src/app/services/api.service';
import { Service } from 'src/app/services/service.service';

// import { Observable } from 'rxjs'

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  filmes: any[] = []
  filmeHeader: any = ''
  trailer: boolean = false;
  notFound = false;
  valueSelected = this.serviceApi.valueSelected
  inputValue = ''
  load = false
  constructor(private serviceApi: ApiService,
    private service: Service
  ) { }
  searchMovies(event: any) {
    this.filmes = [];
    this.serviceApi.searchMovies(this.inputValue, false).subscribe((filmes) => {
      this.filmes = this.service.setFilme(filmes['results'])
      if (this.filmes.length === 0) {
        this.notFound = true;
        this.load = null
      }
      else {
        this.notFound = false;
        this.load = false;
      }
    });

  }
  onValueTrailer(event: any) {
    this.trailer = event.trailer
  }
  onCategory(value: any) {
    this.load = false
    if (this.valueSelected.category !== value) {
      this.notFound = false;
      this.inputValue = '';
      this.valueSelected.category = value;
      this.filmes = [];
      this.serviceApi.setCategory(value)
      this.serviceApi.getMovies().subscribe((filmes) => {
        this.filmes = this.service.setFilme(filmes['results'])
      });
    }
  }
  onOption(event: any) {
    this.load = false
    if (event.value !== this.serviceApi.valueSelected.option.value) {
      this.inputValue = "";
      this.filmes = [];
      this.serviceApi.getMovies().subscribe((filmes) => {
        this.filmes = this.service.setFilme(filmes['results'])
      });
      this.serviceApi.getMoviesUpcoming().subscribe((filmes) => {
        this.filmeHeader = this.service.setFilmeHeader(filmes['results'])
      });
    }

  }
  loadFilms(event: any) {
    if (this.load === false && (document?.getElementById('lista')?.offsetHeight <= window.scrollY)) {
      this.load = true
      let label = this.inputValue === "" ? 'getMovies' : 'searchMovies'
      this.serviceApi[label](this.inputValue, true).subscribe((filmes) => {
        let retorno = this.service.setFilme(filmes['results'])
        if (retorno.length === 0) {
          this.load = null
        }
        else {
          this.filmes.push(...retorno)
          this.load = false
        }
      });
    }
  }
  ngOnInit(): void {
    this.serviceApi.getMovies().subscribe((filmes) => {
      this.filmes = this.service.setFilme(filmes['results'])
      console.log(this.filmes);


    });
    this.serviceApi.getMoviesUpcoming().subscribe((filmes) => {
      console.log(this.filmeHeader);

      this.filmeHeader = this.service.setFilmeHeader(filmes['results'])
    });

  }
}
