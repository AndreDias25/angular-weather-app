import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MainWeatherCardComponent } from './components/main-weather-card/main-weather-card.component';
import { ForecastCardComponent } from './components/forecast-card/forecast-card.component';
import { RandomAdviceCardComponent } from './components/random-advice-card/random-advice-card.component';

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
    AppRoutingModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
