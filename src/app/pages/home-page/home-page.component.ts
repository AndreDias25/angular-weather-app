import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID  } from '@angular/core';
import { AccuweatherApiService } from '../../services/accuweather-api.service';
import { CityAutoComplete } from '../../models/CityAutoComplete';
import { CityCurrentCondition } from '../../models/CityCurrentCondition';
import { Next12Hours } from '../../models/Next12Hours';
import { RandomQuote } from '../../models/RandomQuote';
import { FormControl } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { Observable, Subject, catchError, debounceTime, distinctUntilChanged, filter, map, take, takeUntil, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  cityName!: string;
  cityFound: CityAutoComplete[] = [];
  cityKeySelected!: string;
  queryField = new FormControl();
  results$!: Observable<any>;

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
  iconsColor!:string;

  backgroundColorForecast!:string;
  audio: HTMLAudioElement | null = null;
  messageError:boolean = true;
  textMessageError!:string;
  ultimoBackground:string = this.backgroundImageUrl;

  constructor(private service: AccuweatherApiService, @Inject(PLATFORM_ID) private platformId: any){
    if (isPlatformBrowser(this.platformId)) {
      this.audio = new Audio('../../../assets/sounds/click.m4a');
      this.audio.load();
    }
  }

  ngOnInit() {
    this.results$ = this.queryField.valueChanges
      .pipe(
        map(value => value.trim()),
        filter(value => value.length > 2),
        debounceTime(200),
        distinctUntilChanged(),
        tap(cityname => {
          this.service.getCityAutoComplete(cityname)
          .pipe(takeUntil(this.destroy$))
          .subscribe((result: CityAutoComplete[]) => {
            this.cityFound = result;
          });

          this.cityFound.forEach(objeto => {
          })
        }),
        takeUntil(this.destroy$)
      )

    this.results$.subscribe();

    this.service.getRandomQuote()
    .pipe(takeUntil(this.destroy$))
    .subscribe((quote: RandomQuote) => {
      this.author = quote.author;
      this.content = quote.content;
    })

    if (isPlatformBrowser(this.platformId)) {
      let ultimaCidade:string | null = localStorage.getItem("nomeCidade");
      let keyultimaCidade:string | null  = localStorage.getItem("keyCidade");
      let estadoltimaCidade:string | null  = localStorage.getItem("estadoCidade");
      if(ultimaCidade){
        this.searchCity(ultimaCidade, keyultimaCidade, estadoltimaCidade)
      }else{
        this.searchCity("São Paulo", "45881", "São Paulo");
      }
    }
  }

  searchCity(cityName:string, keyCity?:string | null, estadoCity?:string | null){
    if(cityName === ''){
      this.msgError('empty')
    }else{
      if(this.cityFound.length === 0){
        this.service.getCurrentCondition(keyCity)
        .pipe(takeUntil(this.destroy$),
        catchError(error => {
          this.msgError('error');
          return throwError('Ocorreu um erro na solicitação');
        }))
        .subscribe((result: CityCurrentCondition[]) => {
          this.temperature = result[0].Temperature.Metric.Value;
          this.weatherText = result[0].WeatherText;
          this.currentCity = cityName;
          this.currentState = String(estadoCity);
          this.localObservationDateTime = result[0].LocalObservationDateTime;
          this.realFeelTemperature = result[0].RealFeelTemperature.Metric.Value;

          this.service.getIconsAndBackground()
          .pipe(takeUntil(this.destroy$),
          catchError(error => {
            this.msgError('error');
            return throwError('Ocorreu um erro na solicitação');
          }))
          .subscribe(dados => {
            dados.forEach((dados: any) => {
              if((result[0].WeatherText.toLowerCase() == dados.WeatherText.toLowerCase() && result[0].IsDayTime == dados.IsDayTime) || (result[0].WeatherText.toLowerCase() == dados.WeatherText.toLowerCase() && dados.IsDayTime == undefined)){
                this.iconWeather = dados.weatherIcon;
                this.backgroundImageUrl = dados.backgroundImage;
                this.weatherText = dados.Texto;

                this.changeBackgroundAndColor(this.backgroundImageUrl)
                //this.detectarMudancaNaResolucao();
              }
            });
          })
        })

        this.service.getNext12hours(String(keyCity))
        .pipe(takeUntil(this.destroy$))
        .subscribe((result: Next12Hours | Next12Hours[]) => {
          if (Array.isArray(result)) {

            this.upcomingTimes = result.map(item => item.DateTime);
            this.temperatureForecast = result.map(item => item.Temperature.Value)
          } else {

            this.upcomingTimes = [result.DateTime];
            this.temperatureForecast = [result.Temperature.Value];
          }
        })
      }else{
        this.cityFound.forEach(objeto => {
          if(objeto.LocalizedName === cityName){
            this.cityKeySelected = objeto.Key;
            if (isPlatformBrowser(this.platformId)) {
              localStorage.setItem("nomeCidade", cityName);
              localStorage.setItem("keyCidade", this.cityKeySelected);
              localStorage.setItem("estadoCidade", objeto.AdministrativeArea.LocalizedName);
            }

            this.service.getCurrentCondition(this.cityKeySelected)
            .pipe(takeUntil(this.destroy$))
            .subscribe((result: CityCurrentCondition[]) => {
              this.temperature = result[0].Temperature.Metric.Value;
              this.weatherText = result[0].WeatherText;
              this.currentCity = objeto.LocalizedName;
              this.currentState = objeto.AdministrativeArea.LocalizedName;
              this.localObservationDateTime = result[0].LocalObservationDateTime;
              this.realFeelTemperature = result[0].RealFeelTemperature.Metric.Value;

              this.service.getIconsAndBackground()
              .pipe(takeUntil(this.destroy$))
              .subscribe(dados => {
                dados.forEach((dados: any) => {
                  if((result[0].WeatherText.toLowerCase() == dados.WeatherText.toLowerCase() && result[0].IsDayTime == dados.IsDayTime) || (result[0].WeatherText.toLowerCase() == dados.WeatherText.toLowerCase() && dados.IsDayTime == undefined)){
                    this.iconWeather = dados.weatherIcon;
                    this.backgroundImageUrl = dados.backgroundImage;
                    this.weatherText = dados.Texto;

                    this.changeBackgroundAndColor(this.backgroundImageUrl)
                    //this.detectarMudancaNaResolucao();
                  }
                });
              })
            })

            this.service.getNext12hours(this.cityKeySelected)
            .pipe(takeUntil(this.destroy$))
            .subscribe((result: Next12Hours | Next12Hours[]) => {
              if (Array.isArray(result)) {

                this.upcomingTimes = result.map(item => item.DateTime);
                this.temperatureForecast = result.map(item => item.Temperature.Value)
              } else {

                this.upcomingTimes = [result.DateTime];
                this.temperatureForecast = [result.Temperature.Value];
              }
            })
          }
        })
      }
    }
  }

  playSound(){
    if(this.audio){
      this.audio.play();
    }
  }

  onCloseError(){
    this.messageError = true;
  }

  changeBackgroundAndColor(backgroundImage:string){
    switch(backgroundImage){
      case "../../assets/images/sunny1.png":
        this.backgroundColor = '#FAE2BD';
        this.backgroundColorForecast = '#FAE2BD';
        this.textColor = '#EFAA82';
        this.iconsColor = '#B34214';
        break;
      case "../../assets/images/sunny2.png":
        this.backgroundColor = '#9FDCA8';
        this.backgroundColorForecast = "#8ECA96";
        this.textColor = '#71A78F';
        this.iconsColor = '#4A5C54';
        break;
      case "../../assets/images/cloud1.png":
        this.backgroundColor = '#91B4C6';
        this.backgroundColorForecast = '#91B4C6';
        this.textColor = '#CAD7DF';
        this.iconsColor = '#3A3D40';
        break;
      case "../../assets/images/cloud2.png":
        this.backgroundColor = '#5A8BAB';
        this.backgroundColorForecast = '#5A8BAB';
        this.textColor = '#AED5E4';
        this.iconsColor = '#AED5E4';
        break;
      case "../../assets/images/cloud3.png":
        this.backgroundColor = '#AC736A';
        this.backgroundColorForecast = '#AC736A';
        this.textColor = '#F6C8A4';
        this.iconsColor = '#F6C8A4'
        break;
      case "../../assets/images/cloud4.png":
        this.backgroundColor = '#9090AC';
        this.backgroundColorForecast = '#484A82';
        this.textColor = '#484A82';
        this.iconsColor = '#E8E9F6';
        break;
      case "../../assets/images/rainy1.png":
        this.backgroundColor = '#40666A';
        this.backgroundColorForecast = '#40666A';
        this.textColor = '#C9E8E0';
        this.iconsColor = '#C9E8E0';
        break;
      case "../../assets/images/rainy2.png":
        this.backgroundColor = '#615273';
        this.backgroundColorForecast = '#CCDAFF'
        this.textColor = '#C2B8FF';
        this.iconsColor = '#615273';
        break;
      case "../../assets/images/rainy3.png":
        this.backgroundColor = '#7FC3AE';
        this.backgroundColorForecast = '#7FC3AE'
        this.textColor = '#C9E8E0';
        this.iconsColor = '#32433E';
        break;
      case "../../assets/images/snowy1.png":
        this.backgroundColor = '#99B8CC';
        this.backgroundColorForecast = '#99B8CC';
        this.textColor = '#E4F1F9';
        this.iconsColor = '#E4F1F9';
        break;
      case "../../assets/images/snowy2.png":
        this.backgroundColor = '#A7ACC4';
        this.backgroundColorForecast = '#A7ACC4';
        this.textColor = '#E2E2E3';
        this.iconsColor = '#E2E2E3';
        break;
      default:
        break;
    }
  }

  msgError(situation:string){
    this.messageError = false;

    setTimeout(() => {
      this.messageError = true;
    }, 3000);

    switch (situation) {
      case 'empty':
        this.textMessageError = "Digite o nome de uma cidade!"
        break;
      case 'error':
        this.textMessageError = "Cidade inválida!"
        break;
      default:
        this.textMessageError = "Erro!"
        break;
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
