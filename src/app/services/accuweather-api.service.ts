import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
  constructor(private http: HttpClient) {}

  getCityAutoComplete(cityName:string):Observable<CityAutoComplete[]>{
    return this.http.get<CityAutoComplete[]>(`https://weather-app-backend-one-opal.vercel.app/api/cities/autocomplete/:${cityName}`)
  }

  getCurrentCondition(cityKey:string | null | undefined){
    return this.http.get<CityCurrentCondition[]>(`https://weather-app-backend-one-opal.vercel.app/api/currentconditions/:${cityKey}`)
  }

  getNext12hours(cityKey:string){
    return this.http.get<Next12Hours[]>(`https://weather-app-backend-one-opal.vercel.app/api/forecasts/12hour/:${cityKey}`)
  }

  getRandomQuote(){
    return this.http.get<RandomQuote>("https://api.quotable.io/random");
  }

  getIconsAndBackground(): Observable<any>{
    return this.http.get("assets/weatherIconsAndBackground.json")
  }
}
