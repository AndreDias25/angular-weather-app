import { Component, Input } from '@angular/core';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-forecast-card',
  templateUrl: './forecast-card.component.html',
  styleUrl: './forecast-card.component.scss'
})
export class ForecastCardComponent {
    @Input() upcomingTimes!:string[];
    @Input() temperatureForecast!:number[];
    @Input() backgroundColorForecast!:string;
}
