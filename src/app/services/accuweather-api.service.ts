import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { CityAutoComplete } from '../models/CityAutoComplete';

@Injectable({
  providedIn: 'root'
})
export class AccuweatherApiService {
  private cityautoComplete:string = environment.apiAutoCompleteSearch;
  private apiKey:string = environment.apiKey;
  private cityAutoCompleteModel!:CityAutoComplete;

  constructor(private http: HttpClient) { }

  getCityAutoComplete(cityName:string):Observable<CityAutoComplete[]>{
    //this.cityAutoCompleteModel = this.http.get<CityAutoComplete>(`${this.cityautoComplete}?apikey=${this.apiKey}&q=${cityName}`)
    //return this.cityAutoCompleteModel;
    return this.http.get<CityAutoComplete[]>(`${this.cityautoComplete}?apikey=${this.apiKey}&q=${cityName}`)
  }

  getCurrentCondition(cityKey:string){

  }
}
