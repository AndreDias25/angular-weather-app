import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MainWeatherCardComponent } from './components/main-weather-card/main-weather-card.component';
import { ForecastCardComponent } from './components/forecast-card/forecast-card.component';
import { RandomAdviceCardComponent } from './components/random-advice-card/random-advice-card.component';
import { AccuweatherApiService } from './services/accuweather-api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MsgErrorComponent } from './components/msg-error/msg-error.component';


registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    MainWeatherCardComponent,
    ForecastCardComponent,
    RandomAdviceCardComponent,
    MsgErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide:LOCALE_ID, useValue:'pt-BR'},
    provideClientHydration(),
    AccuweatherApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
