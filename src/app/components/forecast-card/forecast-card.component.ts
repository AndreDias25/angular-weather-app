import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-forecast-card',
  templateUrl: './forecast-card.component.html',
  styleUrl: './forecast-card.component.scss'
})
export class ForecastCardComponent implements OnInit, OnChanges{
    @Input() upcomingTimes!:string[];
    @Input() temperatureForecast!:number[];
    @Input() backgroundColorForecast!:string;
    @Input() textColor!:string;
    textColorForecast!:string;

    ngOnInit(){
      this.updateColors();
    }

    ngOnChanges(changes: SimpleChanges) {
      if (changes['textColor'] || changes['backgroundColorForecast']) {
        this.updateColors();
      }
    }

    @HostListener('window:resize', ['$event'])
    onResize(event:any){
      this.updateColors();
    }

    private updateColors(){
      const larguraDaTela = window.innerWidth;
      if(larguraDaTela >= 1000){
        this.textColorForecast = this.textColor;
      }else{
        this.textColorForecast = '#FFFFFF'
      }
    }
}
