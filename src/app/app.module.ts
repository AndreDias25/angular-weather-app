import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MainWeatherCardComponent } from './components/main-weather-card/main-weather-card.component';
import { ForecastCardComponent } from './components/forecast-card/forecast-card.component';
import { RandomAdviceCardComponent } from './components/random-advice-card/random-advice-card.component';
import { AccuweatherApiService } from './services/accuweather-api.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    MainWeatherCardComponent,
    ForecastCardComponent,
    RandomAdviceCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(),
    AccuweatherApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
