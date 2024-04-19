export interface Temperature {
  Metric: {
    Value: number;
    Unit: string;
    UnitType: number;
  };
  Imperial: {
    Value: number;
    Unit: string;
    UnitType: number;
  };
}

export interface Wind {
  Direction: {
    Degrees: number;
    Localized: string;
    English: string;
  };
  Speed: {
    Metric: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
    Imperial: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
  };
}

export interface WindGust {
  Speed: {
    Metric: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
    Imperial: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
  };
}

export interface DewPoint {
  Metric: {
    Value: number;
    Unit: string;
    UnitType: number;
  };
  Imperial: {
    Value: number;
    Unit: string;
    UnitType: number;
  };
}

export interface Visibility {
  Metric: {
    Value: number;
    Unit: string;
    UnitType: number;
  };
  Imperial: {
    Value: number;
    Unit: string;
    UnitType: number;
  };
}

export interface Ceiling {
  Metric: {
    Value: number;
    Unit: string;
    UnitType: number;
  };
  Imperial: {
    Value: number;
    Unit: string;
    UnitType: number;
  };
}

export interface Pressure {
  Metric: {
    Value: number;
    Unit: string;
    UnitType: number;
  };
  Imperial: {
    Value: number;
    Unit: string;
    UnitType: number;
  };
}

export interface Past24HourTemperatureDeparture {
  Metric: {
    Value: number;
    Unit: string;
    UnitType: number;
  };
  Imperial: {
    Value: number;
    Unit: string;
    UnitType: number;
  };
}

export interface Precip {
  Metric: {
    Value: number;
    Unit: string;
    UnitType: number;
  };
  Imperial: {
    Value: number;
    Unit: string;
    UnitType: number;
  };
}

export interface PrecipitationSummary {
  Precipitation: Precip;
  PastHour: Precip;
  Past3Hours: Precip;
  Past6Hours: Precip;
  Past9Hours: Precip;
  Past12Hours: Precip;
  Past18Hours: Precip;
  Past24Hours: Precip;
}

export interface TemperatureRange {
  Minimum: Temperature;
  Maximum: Temperature;
}

export interface TemperatureSummary {
  Past6HourRange: TemperatureRange;
  Past12HourRange: TemperatureRange;
  Past24HourRange: TemperatureRange;
}

export interface CityCurrentCondition {
  LocalObservationDateTime: string;
  EpochTime: number;
  WeatherText: string;
  WeatherIcon: number;
  HasPrecipitation: boolean;
  PrecipitationType: string | null;
  IsDayTime: boolean;
  Temperature: Temperature;
  RealFeelTemperature: Temperature & { Phrase: string };
  RealFeelTemperatureShade: Temperature & { Phrase: string };
  RelativeHumidity: number;
  IndoorRelativeHumidity: number;
  DewPoint: DewPoint;
  Wind: Wind;
  WindGust: WindGust;
  UVIndex: number;
  UVIndexText: string;
  Visibility: Visibility;
  ObstructionsToVisibility: string;
  CloudCover: number;
  Ceiling: Ceiling;
  Pressure: Pressure;
  PressureTendency: {
    LocalizedText: string;
    Code: string;
  };
  Past24HourTemperatureDeparture: Past24HourTemperatureDeparture;
  ApparentTemperature: Temperature;
  WindChillTemperature: Temperature;
  WetBulbTemperature: Temperature;
  WetBulbGlobeTemperature: Temperature;
  Precip1hr: Precip;
  PrecipitationSummary: PrecipitationSummary;
  TemperatureSummary: TemperatureSummary;
  MobileLink: string;
  Link: string;
}
