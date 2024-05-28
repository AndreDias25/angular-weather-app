import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { AccuweatherApiService } from '../../services/accuweather-api.service';
import { CityAutoComplete } from '../../models/CityAutoComplete';
import { CityCurrentCondition } from '../../models/CityCurrentCondition';
import { Next12Hours } from '../../models/Next12Hours';
import { RandomQuote } from '../../models/RandomQuote';
import { FormControl } from '@angular/forms';
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

  backgroundColorForecast!:string;
  audio = new Audio();
  messageError:boolean = true;
  textMessageError!:string;
  ultimoBackground:string = this.backgroundImageUrl;

  @HostListener('window:resize', ['$event'])
  onResize(event:any){
    this.detectarMudancaNaResolucao();
  }

  detectarMudancaNaResolucao(){
    const larguraDaTela = window.innerWidth;
    const alturaDaTela = window.innerHeight;

    if (larguraDaTela >= 1000) {
      console.log("entrei no 1000")

      if (this.backgroundImageUrl === 'none') {
          console.log("Nao pegar o valor do backurl")
      } else {
          this.ultimoBackground = this.backgroundImageUrl;
      }

      console.log(`Ultimo back(1000): ${this.ultimoBackground}`)

      document.body.style.backgroundColor = this.textColor;
      this.backgroundImageUrl = 'none';
      document.body.style.backgroundImage = 'none';
  } else if (larguraDaTela < 1000) {
      console.log("menos de 1000");
      console.log(`Ultimo back: ${this.ultimoBackground}`)

      if (this.ultimoBackground) {
          this.backgroundImageUrl = this.ultimoBackground;
          document.body.style.backgroundImage = `url(${this.backgroundImageUrl})`;
      }
  }
  }


  constructor(private service: AccuweatherApiService){
    this.audio.src = '../../../assets/sounds/click.m4a';
    this.audio.load();
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
            console.log(result);
            console.log(result[0].LocalizedName);
            //this.cityFound = result.LocalizedName;
            this.cityFound = result;
            console.log("cityFound="+this.cityFound)
          });

          this.cityFound.forEach(objeto => {
            console.log("LocalizedName="+objeto.LocalizedName);
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

    console.log(`Tipo: ${this.cityFound.length}`);

    let ultimaCidade:string | null = localStorage.getItem("nomeCidade");
    let keyultimaCidade:string | null  = localStorage.getItem("keyCidade");
    let estadoltimaCidade:string | null  = localStorage.getItem("estadoCidade");
    if(ultimaCidade){
      console.log(ultimaCidade)
      this.searchCity(ultimaCidade, keyultimaCidade, estadoltimaCidade)
    }else{
      this.searchCity("São Paulo");
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
          console.log("Não achei a cidade!")
          return throwError('Ocorreu um erro na solicitação');
        }))
        .subscribe((result: CityCurrentCondition[]) => {
          console.log(result);
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

                console.log(`Icon: ${this.iconWeather} -  Image: ${this.backgroundImageUrl}`);
                this.changeBackgroundAndColor(this.backgroundImageUrl)
                this.detectarMudancaNaResolucao();
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
            console.log(`Horário: ${this.upcomingTimes} - Temperatura: ${this.temperatureForecast }`)
          } else {

            this.upcomingTimes = [result.DateTime];
            this.temperatureForecast = [result.Temperature.Value];
          }
        })
      }else{
        this.cityFound.forEach(objeto => {
          if(objeto.LocalizedName === cityName){
            this.cityKeySelected = objeto.Key;
            console.log(this.cityKeySelected);
            localStorage.setItem("nomeCidade", cityName);
            localStorage.setItem("keyCidade", this.cityKeySelected);
            localStorage.setItem("estadoCidade", objeto.AdministrativeArea.LocalizedName);

            this.service.getCurrentCondition(this.cityKeySelected)
            .pipe(takeUntil(this.destroy$))
            .subscribe((result: CityCurrentCondition[]) => {
              console.log(result);
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

                    console.log(`Icon: ${this.iconWeather} -  Image: ${this.backgroundImageUrl}`);
                    this.changeBackgroundAndColor(this.backgroundImageUrl)
                    this.detectarMudancaNaResolucao();
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
                console.log(`Horário: ${this.upcomingTimes} - Temperatura: ${this.temperatureForecast }`)
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
    this.audio.play();
  }

  onCloseError(){
    this.messageError = true;
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
