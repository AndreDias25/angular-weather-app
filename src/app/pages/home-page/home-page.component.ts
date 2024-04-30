import { Component, OnInit } from '@angular/core';
import { AccuweatherApiService } from '../../services/accuweather-api.service';
import { CityAutoComplete } from '../../models/CityAutoComplete';
import { CityCurrentCondition } from '../../models/CityCurrentCondition';
import { Next12Hours } from '../../models/Next12Hours';
import { RandomQuote } from '../../models/RandomQuote';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {
  cityName!: string;
  cityFound: CityAutoComplete[] = [];
  cityKeySelected!: string;

  temperature!: number;
  weatherText!: string;
  localObservationDateTime!: string;
  realFeelTemperature!: number;
  currentCity!: string;
  currentState!: string;

  upcomingTimes!:string[];
  temperatureForecast!:number[];

  randomQuote!:string;
  author!:string;
  content!:string;


  constructor(private service: AccuweatherApiService){}

  ngOnInit() {
    this.service.getRandomQuote().subscribe((quote: RandomQuote) => {
      this.author = quote.author;
      this.content = quote.content;
    })
  }

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

        this.service.getNext12hours(this.cityKeySelected).subscribe((result: Next12Hours | Next12Hours[]) => {
          if (Array.isArray(result)) {

            this.upcomingTimes = result.map(item => item.DateTime);
            this.temperatureForecast = result.map(item => item.Temperature.Value)
            console.log(`Horário: ${this.upcomingTimes} - Temperatura: ${this.temperatureForecast }`)
          } else {

            this.upcomingTimes = [result.DateTime];
            this.temperatureForecast = [result.Temperature.Value];
          }

          // console.log(result)
        })
      }
    })
  }

}
