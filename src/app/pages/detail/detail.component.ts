import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Service } from 'src/app/services/service.service';
@Component({
  selector: 'detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  id: any;
  filme: any
  trailer: boolean = false;
  stars: any[] = Array.from({ length: 5 })
  producao: any
  recomendados: any[];
  carousel = { crew: { value: 0, step: 3 }, cast: { value: 0, step: 7 }, recomendados: { value: 0, step: 2 } }
  constructor(private route: ActivatedRoute, private serviceApi: ApiService,
    private service: Service) { }
  next(value: any, label: any) {
    this.carousel[label].value += value
    if (this.carousel[label].value === -1) {
      this.carousel[label].value = (this.producao[label]?.length || this.recomendados?.length) - this.carousel[label].step
    }

    if (this.carousel[label].value + this.carousel[label].step > (this.producao[label]?.length || this.recomendados?.length)) {
      this.carousel[label].value = 0;
    }
  }
  onValueTrailer(event: any) {
    this.trailer = event.trailer
  }
  onChangeWidth(event: any) {
    this.carousel.cast.step = 7;
    this.carousel.crew.step = 3;
    this.carousel.recomendados.step = 2;
    if (window.outerWidth <= 1024 && window.outerWidth >= 768) {
      this.carousel.crew.step = 2;
      this.carousel.recomendados.step = 1;
    }
    if (window.outerWidth < 768) {
      this.carousel.recomendados.step = 0;
      this.carousel.crew.step = 1;
      this.carousel.cast.step = 3;
    }
    if (window.outerWidth === 768) {
      this.carousel.recomendados.step = 0;
    }
  }
  onChangeFilm(id: any) {
    this.serviceApi.getDetail(this.id).subscribe((filme) => {
      this.filme = this.service.setFilmeDetail(filme)
    })
    this.serviceApi.getCredits(this.id).subscribe((producao) => {
      this.producao = this.service.setProducao(producao)
    })
    this.serviceApi.getRecommendations(this.id).subscribe((recomendacoes) => {
      this.recomendados = this.service.setFilme(recomendacoes['results'])

    })
  }
  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.id = params['id']
      this.onChangeFilm(this.id)
      this.onChangeWidth(this.id)
    })

  }

}
