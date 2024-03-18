import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  enterCity(event:any){
   console.log(event);

    // if(event.which == 8){
    //   console.log("OKay")
    // }

    if(event.key === 'Enter'){
      console.log("Enter")
    }
  }

  searchCity(event:any){
    console.log(event.value);
  }
}
