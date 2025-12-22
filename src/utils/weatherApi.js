import { apiKey, coordinates } from "./constants.js";

export function getWeatherData() {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.long}&units=imperial&appid=${apiKey}`
  )
    .then((res) => {
      return res.ok
        ? res.json()
        : Promise.reject(`Error when fetching weather api: ${res.status}`);
    })
    .then((data) => {
      return parseWeatherData(data);
    });
}

function parseWeatherData(data) {
  const parseData = { temp: {} };
  parseData.name = data.name;
  parseData.temp.F = Math.round(data.main.temp);
  parseData.temp.C = Math.round(((data.main.temp - 32) * 5) / 9);

  parseData.weatherType = data.weather[0].main;
  parseData.sunrise = data.sys.sunrise;
  parseData.sunset = data.sys.sunset;

  return parseData;
}

export function getWeatherCondition(temperature) {
  if (temperature >= 86) {
    return "hot";
  } else if (temperature >= 66) {
    return "warm";
  } else {
    return "cold";
  }
}
