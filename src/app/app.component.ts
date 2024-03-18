import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  title = 'weather-app';

  ngOnInit() {
    if(typeof navigator !== 'undefined'){
      navigator.geolocation.getCurrentPosition((pos) => {
        console.log("Latitude", pos.coords.latitude);
        console.log("Longitude", pos.coords.longitude);
      });
    }
  }
}
