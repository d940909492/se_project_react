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
  const parseData = {};
  parseData.name = data.name;
  parseData.temp = Math.round(data.main.temp);
  return parseData;
}

export function getWeatherCondition() {}
