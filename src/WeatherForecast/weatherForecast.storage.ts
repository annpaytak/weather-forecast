import { CurrentWeather } from "./weatherForecast.types";

const storagePrefix = "weather_app_";

const storage = {
  getSearchedCities: () => {
    return (
      JSON.parse(
        window.localStorage.getItem(`${storagePrefix}searched_cities`) as string
      ) || []
    );
  },
  setSearchedCities: (cities: CurrentWeather[]) => {
    window.localStorage.setItem(
      `${storagePrefix}searched_cities`,
      JSON.stringify(cities)
    );
  },
  clearSearchedCities: () => {
    window.localStorage.removeItem(`${storagePrefix}searched_cities`);
  },
};

export default storage;
