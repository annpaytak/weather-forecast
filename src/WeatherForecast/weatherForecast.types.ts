export type CurrentWeather = {
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };
  name: string;
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
};

export type ResponseError = {
  code: number;
  message: string;
};
