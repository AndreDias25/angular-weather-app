import { Component } from '@angular/core';
import { AccuweatherApiService } from '../../services/accuweather-api.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  cityName!: string;
  cityFound!: string;

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
      const cityName = event.target.value;
      this.service.getCityAutoComplete(cityName).subscribe((result: any) => {
        console.log(result);
        console.log(result[0].LocalizedName);
        this.cityFound = result[0].LocalizedName;
      });
    }
  }

  searchCity(event:any){
    console.log(event.value);
  }
}
