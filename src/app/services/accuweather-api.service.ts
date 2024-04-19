import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { CityAutoComplete } from '../models/CityAutoComplete';
import { CityCurrentCondition } from '../models/CityCurrentCondition';

@Injectable({
  providedIn: 'root'
})
export class AccuweatherApiService {
  private cityautoComplete:string = environment.apiAutoCompleteSearch;
  private cityCurrentCondition:string = environment.apiCurrentCondition;
  private apiKey:string = environment.apiKey;
  private cityAutoCompleteModel!:CityAutoComplete;
  private cityCurrentConditionModel!:CityCurrentCondition;

  constructor(private http: HttpClient) { }

  getCityAutoComplete(cityName:string):Observable<CityAutoComplete[]>{
    //this.cityAutoCompleteModel = this.http.get<CityAutoComplete>(`${this.cityautoComplete}?apikey=${this.apiKey}&q=${cityName}`)
    //return this.cityAutoCompleteModel;
    return this.http.get<CityAutoComplete[]>(`${this.cityautoComplete}?apikey=${this.apiKey}&q=${cityName}`)
  }

  getCurrentCondition(cityKey:string){
    return this.http.get<CityCurrentCondition[]>(`${this.cityCurrentCondition}${cityKey}?apikey=${this.apiKey}&details=true`)
  }
}
