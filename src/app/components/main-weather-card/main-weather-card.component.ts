import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-main-weather-card',
  templateUrl: './main-weather-card.component.html',
  styleUrl: './main-weather-card.component.scss'
})
export class MainWeatherCardComponent {
  @Input() temperature!: number;
  @Input() weatherText!: string;
  @Input() localObservationDateTime!: string;
  @Input() realFeelTemperature!: number;
  @Input() currentCity!: string;
  @Input() currentState!: string;
  @Input() iconWeather!: string;
  @Input() backgroundColor!:string;
  @Input() textColor!:string;
}
