import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { CityAutoComplete } from '../models/CityAutoComplete';
import { CityCurrentCondition } from '../models/CityCurrentCondition';
import { Next12Hours} from '../models/Next12Hours';
import { RandomQuote } from '../models/RandomQuote';
import { handler } from 'functions/fetch-api-key/fetch-api-key';

@Injectable({
  providedIn: 'root'
})
export class AccuweatherApiService {
  private cityautoComplete:string = "http://dataservice.accuweather.com/locations/v1/cities/autocomplete";
  private cityCurrentCondition:string = "http://dataservice.accuweather.com/currentconditions/v1/";
  private Next12hours:string = "http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/";
  private apiKey:BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) { }

  fetchApiKey(): void {
    this.http.get<{ apiKey: string }>('https://weatherangularapp1.netlify.app/.netlify/functions/fetch-api-key').pipe(
      tap(response => this.apiKey.next(response.apiKey))
    ).subscribe();
  }

  getCityAutoComplete(cityName:string):Observable<CityAutoComplete[]>{
    return this.apiKey.pipe(
      switchMap(apiKey => this.http.get<CityAutoComplete[]>(`${this.cityautoComplete}?apikey=${apiKey}&q=${cityName}`))
    );
  }

  getCurrentCondition(cityKey:string | null | undefined){
    return this.apiKey.pipe(
      switchMap(apiKey => this.http.get<CityCurrentCondition[]>(`${this.cityCurrentCondition}${cityKey}?apikey=${apiKey}&details=true`))
    );
  }

  getNext12hours(cityKey:string){
    return this.apiKey.pipe(
      switchMap(apiKey => this.http.get<Next12Hours[]>(`${this.Next12hours}${cityKey}?apikey=${apiKey}&metric=true`))
    );
  }

  getRandomQuote(){
    return this.http.get<RandomQuote>("https://api.quotable.io/random");
  }

  getIconsAndBackground(): Observable<any>{
    return this.http.get("assets/weatherIconsAndBackground.json")
  }
}
