import { Component } from '@angular/core';
import { AccuweatherApiService } from '../../services/accuweather-api.service';
import { CityAutoComplete } from '../../models/CityAutoComplete';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  cityName!: string;
  cityFound: CityAutoComplete[] = [];
  cityKeySelected!: string;


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
      }
    })
  }

}
