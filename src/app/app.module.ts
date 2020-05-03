import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { LottieModule } from 'ngx-lottie';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { DetailComponent } from './pages/detail/detail.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { TrailerYoutubeComponent } from './components/trailer-youtube/trailer-youtube.component';
import { LottieComponent } from './components/lottie/lottie.component';
import { ButtonTopComponent } from './components/button-top/button-top.component';

export function playerFactory() {
  return import('lottie-web');
}

@NgModule({
  declarations: [AppComponent, NavbarComponent, FooterComponent, HomeComponent, DetailComponent, PageNotFoundComponent, TrailerYoutubeComponent, LottieComponent, ButtonTopComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, [LottieModule.forRoot({ player: playerFactory })]
    , FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
