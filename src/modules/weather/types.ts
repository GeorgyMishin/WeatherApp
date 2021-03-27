export type Coords = {
  lat: number;
  lon: number;
};

export type WeatherInfo = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export type MainWeatherInfo = {
  temp: number;
  feelsLike: number;
  tempMin: number;
  tempMax: number;
  pressure: number;
  humidity: number;
};

export type Wind = {
  speed: number;
  deg: number;
};

export type Clouds = {
  all: number;
};

export type Weather = {
  base: string;
  name: string;
  visibility: number;
  dt: number;
  coord: Coords;
  weatherInfo: WeatherInfo[];
  main: MainWeatherInfo;
  clouds: Clouds;
  wind: Wind;
};

export enum Metrics {
  Celsius = 'c',
  Fahrenheit = 'f',
}
