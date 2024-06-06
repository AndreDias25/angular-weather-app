import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, switchMap, tap } from 'rxjs';
import { CityAutoComplete } from '../models/CityAutoComplete';
import { CityCurrentCondition } from '../models/CityCurrentCondition';
import { Next12Hours} from '../models/Next12Hours';
import { RandomQuote } from '../models/RandomQuote';

interface ApiKeyResponse {
  apiKey: string;
}

@Injectable({
  providedIn: 'root'
})
export class AccuweatherApiService {
  private cityautoComplete:string = "http://dataservice.accuweather.com/locations/v1/cities/autocomplete";
  private cityCurrentCondition:string = "http://dataservice.accuweather.com/currentconditions/v1/";
  private Next12hours:string = "http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/";
  private apiKey!: string;

  constructor(private http: HttpClient) {
    this.fetchApiKey();
   }

  private fetchApiKey(): void {
    this.http.get<ApiKeyResponse>("https://weather-app-backend-one-opal.vercel.app/api/get-key").subscribe(
      (response) => {
        this.apiKey = response.apiKey;
      },
      (error) => {
        console.error('Erro:', error);
      }
    )
  }

  getCityAutoComplete(cityName:string):Observable<CityAutoComplete[]>{
    return this.http.get<CityAutoComplete[]>(`${this.cityautoComplete}?apikey=${this.apiKey}&q=${cityName}`)
  }

  getCurrentCondition(cityKey:string | null | undefined){
    return this.http.get<CityCurrentCondition[]>(`${this.cityCurrentCondition}${cityKey}?apikey=${this.apiKey}&details=true`)
  }

  getNext12hours(cityKey:string){
    return this.http.get<Next12Hours[]>(`${this.Next12hours}${cityKey}?apikey=${this.apiKey}&metric=true`)
  }

  getRandomQuote(){
    return this.http.get<RandomQuote>("https://api.quotable.io/random");
  }

  getIconsAndBackground(): Observable<any>{
    return this.http.get("assets/weatherIconsAndBackground.json")
  }
}
