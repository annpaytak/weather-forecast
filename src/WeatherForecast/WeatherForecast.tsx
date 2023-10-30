import { ChangeEvent, useEffect, useState, useCallback } from "react";
import { CurrentWeather, ResponseError } from "./weatherForecast.types";
import storage from "./weatherForecast.storage";
import { useDebounce } from "../hooks/useDebounce";
import { capitalizedQuery } from "../utils/format";
import weatherIcons from "./weatherForecast.icons";
import "./weatherForecast.scss";

const recentlySearchedCities = storage.getSearchedCities();

function WeatherForecast() {
  const [cityName, setCityName] = useState<string>("");
  const [weather, setWeather] = useState<CurrentWeather | null>(
    recentlySearchedCities[0] || null
  );
  const [error, setError] = useState<ResponseError | null>();

  const [searched, setSearched] = useState<CurrentWeather[]>(
    recentlySearchedCities
  );

  useEffect(() => {
    if (!recentlySearchedCities.length)
      searchWeatherByCityName.flush(capitalizedQuery("Kyiv"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchWeatherByCityName = useDebounce((value: string) => {
    fetch(
      `${import.meta.env.VITE_WEATHER_BASE_URL}?` +
        new URLSearchParams({
          q: `${value}`,
          appid: import.meta.env.VITE_API_KEY,
          units: "metric",
        })
    )
      .then((res) => {
        if (!res.ok) {
          setError({ code: res.status, message: res.statusText });
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        updateSearched(data);
        setWeather(data);
      });
  }, 1000);

  const changeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setCityName(event.target.value);
      searchWeatherByCityName(capitalizedQuery(event.target.value));
      if (!event.target.value.length) searchWeatherByCityName.cancel();
    },
    [searchWeatherByCityName]
  );

  const updateSearched = (city: CurrentWeather) => {
    const found = searched.find((c) => c.name === city.name);

    let _searched = searched;

    if (found) {
      _searched[searched.indexOf(found)] = city;
    } else {
      _searched = [city, ...searched];
    }

    setSearched(_searched);
    storage.setSearchedCities(_searched);
  };

  const removeSearched = (city: CurrentWeather) => {
    const _searched = searched.filter((c) => c.name !== city.name);

    setSearched(_searched);
    storage.setSearchedCities(_searched);

    setWeather(_searched[0]);
  };

  return (
    <>
      <ul className="weather-searched-list">
        {searched.map((city) => (
          <li
            key={city.name}
            className={city.name === weather?.name ? "selected-item" : "item"}
            onClick={() => {
              setWeather(city);
              searchWeatherByCityName(capitalizedQuery(city.name));
            }}
          >
            <p className="name">{city.name}</p>
            <p className="temperature">{Math.round(city.main.temp)}°</p>
            <p className="low-high">
              <span>H:{Math.round(city.main.temp_min)}°</span>
              <span>L:{Math.round(city.main.temp_max)}°</span>
            </p>
            <p className="how">{city.weather[0].main}</p>
            <button
              className="remove-button"
              onClick={(e) => {
                e.stopPropagation();
                removeSearched(city);
              }}
            >
              <span className="emoji" role="img" aria-label="remove">
                ➖
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div className="search">
        <input
          value={cityName}
          placeholder="Search"
          onChange={(e) => {
            changeHandler(e);
            setError(null);
          }}
        />
        {cityName && cityName?.length > 3 && error && (
          <span>{error.message}</span>
        )}
      </div>

      {weather && (
        <div className="weather-main-display">
          <p className="main-name">
            {weather.name}
            <span
              className="emoji"
              role="img"
              aria-label={weather.weather[0].main}
            >
              {
                (weatherIcons as Record<string, string>)[
                  weather.weather[0].icon
                ]
              }
            </span>
          </p>
          <p className="main-temperature">{Math.round(weather.main.temp)}°</p>
          <p>{weather.weather[0].main}</p>
          <p className="main-low-high">
            <span>H:{Math.round(weather.main.temp_min)}°</span>
            <span>L:{Math.round(weather.main.temp_max)}°</span>
          </p>
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </>
  );
}

export default WeatherForecast;
