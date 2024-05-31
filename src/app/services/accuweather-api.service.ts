import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CityAutoComplete } from '../models/CityAutoComplete';
import { CityCurrentCondition } from '../models/CityCurrentCondition';
import { Next12Hours} from '../models/Next12Hours';
import { RandomQuote } from '../models/RandomQuote';

@Injectable({
  providedIn: 'root'
})
export class AccuweatherApiService {
  private cityautoComplete:string = environment.apiAutoCompleteSearch;
  private cityCurrentCondition:string = environment.apiCurrentCondition;
  private Next12hours:string = environment.apiNext12Hours;
  private apiKey:string = environment.apiKey;

  constructor(private http: HttpClient) { }

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
