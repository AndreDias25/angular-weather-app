import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges, PLATFORM_ID, Inject } from '@angular/core';
import { SlicePipe, isPlatformBrowser  } from '@angular/common';

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

    constructor(@Inject(PLATFORM_ID) private platformId: any) {}

    ngOnInit(){
      if (isPlatformBrowser(this.platformId)) {
        this.updateColors();
      }
    }

    ngOnChanges(changes: SimpleChanges) {
      if (isPlatformBrowser(this.platformId)) {
        if (changes['textColor'] || changes['backgroundColorForecast']) {
          this.updateColors();
        }
      }
    }

    @HostListener('window:resize', ['$event'])
    onResize(event:any){
      if (isPlatformBrowser(this.platformId)) {
        this.updateColors();
      }
    }

    private updateColors(){
      if (isPlatformBrowser(this.platformId)) {
        const larguraDaTela = window.innerWidth;
        if(larguraDaTela >= 1000){
          this.textColorForecast = this.textColor;
        }else{
          this.textColorForecast = '#FFFFFF'
        }
      }
    }
}
