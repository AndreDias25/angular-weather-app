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

  iconWeather!:string;
  backgroundImageUrl:string = "../../../assets/images/cloud1.png";

  backgroundColor!:string;
  textColor!:string;

  backgroundColorForecast!:string;


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

          this.service.getIconsAndBackground().subscribe(dados => {
            dados.forEach((dados: any) => {
              if((result[0].WeatherText == dados.WeatherText && result[0].IsDayTime == dados.IsDayTime) || (result[0].WeatherText == dados.WeatherText && dados.IsDayTime == undefined)){
                this.iconWeather = dados.weatherIcon;
                this.backgroundImageUrl = dados.backgroundImage;

                console.log(`Icon: ${this.iconWeather} -  Image: ${this.backgroundImageUrl}`);
                this.changeBackgroundAndColor(this.backgroundImageUrl)
              }
            });
          })
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
        })
      }
    })
  }

  changeBackgroundAndColor(backgroundImage:string){
    switch(backgroundImage){
      case "../../assets/images/sunny1.png":
        console.log("Sunny1");
        this.backgroundColor = '#FAE2BD';
        this.backgroundColorForecast = '#FAE2BD';
        this.textColor = '#EFAA82';
        break;
      case "../../assets/images/sunny2.png":
        console.log("Sunny2");
        this.backgroundColor = '#9FDCA8';
        this.backgroundColorForecast = "#8ECA96";
        this.textColor = '#71A78F';
        break;
      case "../../assets/images/cloud1.png":
        console.log("Cloud1");
        this.backgroundColor = '#91B4C6';
        this.backgroundColorForecast = '#91B4C6';
        this.textColor = '#CAD7DF';
        break;
      case "../../assets/images/cloud2.png":
        console.log("Cloud2");
        this.backgroundColor = '#5A8BAB';
        this.backgroundColorForecast = '#5A8BAB';
        this.textColor = '#AED5E4';
        break;
      case "../../assets/images/cloud3.png":
        console.log("Cloud3");
        this.backgroundColor = '#AC736A';
        this.backgroundColorForecast = '#AC736A';
        this.textColor = '#F6C8A4';
        break;
      case "../../assets/images/cloud4.png":
        console.log("Cloud4");
        this.backgroundColor = '#9090AC';
        this.backgroundColorForecast = '#484A82';
        this.textColor = '#484A82';
        break;
      case "../../assets/images/rainy1.png":
        console.log("Rainy1");
        this.backgroundColor = '#40666A';
        this.backgroundColorForecast = '#40666A';
        this.textColor = '#C9E8E0';
        break;
      case "../../assets/images/rainy2.png":
        console.log("Rainy2");
        this.backgroundColor = '#615273';
        this.backgroundColorForecast = '#CCDAFF'
        this.textColor = '#C2B8FF';
        break;
      case "../../assets/images/rainy3.png":
        console.log("Rainy3");
        this.backgroundColor = '#7FC3AE';
        this.backgroundColorForecast = '#7FC3AE'
        this.textColor = '#C9E8E0';
        break;
      case "../../assets/images/snowy1.png":
        console.log("Snowy1");
        this.backgroundColor = '#99B8CC';
        this.backgroundColorForecast = '#99B8CC';
        this.textColor = '#E4F1F9';
        break;
      case "../../assets/images/snowy2.png":
        console.log("Snowy2");
        this.backgroundColor = '#A7ACC4';
        this.backgroundColorForecast = '#A7ACC4';
        this.textColor = '#E2E2E3';
        break;
      default:
        break;
    }
  }

}
