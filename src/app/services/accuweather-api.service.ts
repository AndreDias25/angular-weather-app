import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccuweatherApiService {
  private cityautoComplete:string = environment.apiAutoCompleteSearch;
  private apiKey:string = environment.apiKey;

  constructor(private http: HttpClient) { }

  getCityAutoComplete(cityName:string):Observable<any>{
    return this.http.get(`${this.cityautoComplete}?apikey=${this.apiKey}&q=${cityName}`)
  }
}
