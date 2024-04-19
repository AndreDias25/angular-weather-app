import { Component } from '@angular/core';
import { AccuweatherApiService } from '../../services/accuweather-api.service';
import { CityAutoComplete } from '../../models/CityAutoComplete';
import { CityCurrentCondition } from '../../models/CityCurrentCondition';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  cityName!: string;
  cityFound: CityAutoComplete[] = [];
  cityKeySelected!: string;

  temperature!: number;
  weatherText!: string;
  localObservationDateTime!: string;
  realFeelTemperature!: number;
  currentCity!: string;
  currentState!: string;


  constructor(private service: AccuweatherApiService){}

  enterCity(event:any){
   //console.log(event);

    // if(event.which == 8){
    //   console.log("OKay")
    // }

    // if(event.key === 'Enter'){
    //   console.log("Enter")
    // }
    // this.cityName = event.target.value;
    // let result = this.service.getCityAutoComplete(this.cityName);
    // console.log(result);

    if (event.key === 'Enter') {
      console.log("oiiii")
      const cityName = event.target.value;
      this.service.getCityAutoComplete(cityName).subscribe((result: CityAutoComplete[]) => {
        console.log(result);
        console.log(result[0].LocalizedName);
        //this.cityFound = result.LocalizedName;
        this.cityFound = result;
        console.log(this.cityFound)
      });

      this.cityFound.forEach(objeto => {
        console.log(objeto.LocalizedName);
      })
    }
  }

  searchCity(cityName:string){
    this.cityFound.forEach(objeto => {
      if(objeto.LocalizedName === cityName){
        this.cityKeySelected = objeto.Key;
        console.log(this.cityKeySelected);

        this.service.getCurrentCondition(this.cityKeySelected).subscribe((result: CityCurrentCondition[]) => {
          console.log(result);
          this.temperature = result[0].Temperature.Metric.Value;
          this.weatherText = result[0].WeatherText;
          this.currentCity = objeto.LocalizedName;
          this.currentState = objeto.AdministrativeArea.LocalizedName;
          this.localObservationDateTime = result[0].LocalObservationDateTime;
          this.realFeelTemperature = result[0].RealFeelTemperature.Metric.Value;
        })
      }
    })
  }

}
