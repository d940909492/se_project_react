export const coordinates = {
  lat: "40.62876092702509",
  long: "-74.002200258111",
};

export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.weather-clothing.jumpingcrab.com"
    : "http://localhost:3001";

export const apiKey = "9e4989fae9c41daa469f5350b530602e";

export const weatherImages = {
  Clear: {
    day: new URL(
      "../assets/WeatherCard/Weather=Clear Sky, Time=Day.png",
      import.meta.url,
    ).href,
    night: new URL(
      "../assets/WeatherCard/Weather=Clear Sky, Time=Night.png",
      import.meta.url,
    ).href,
  },

  Clouds: {
    day: new URL(
      "../assets/WeatherCard/Weather=Cloudy, Time=Day.png",
      import.meta.url,
    ).href,
    night: new URL(
      "../assets/WeatherCard/Weather=Cloudy, Time=Night.png",
      import.meta.url,
    ).href,
  },

  Rain: {
    day: new URL(
      "../assets/WeatherCard/Weather=Rain, Time=Day.png",
      import.meta.url,
    ).href,
    night: new URL(
      "../assets/WeatherCard/Weather=Rain, Time=Night.png",
      import.meta.url,
    ).href,
  },

  Snow: {
    day: new URL(
      "../assets/WeatherCard/Weather=Snow, Time=Day.png",
      import.meta.url,
    ).href,
    night: new URL(
      "../assets/WeatherCard/Weather=Snow, Time=Night.png",
      import.meta.url,
    ).href,
  },

  Fog: {
    day: new URL(
      "../assets/WeatherCard/Weather=Fog, Time=Day.png",
      import.meta.url,
    ).href,
    night: new URL(
      "../assets/WeatherCard/Weather=Fog, Time=Night.png",
      import.meta.url,
    ).href,
  },

  Thunderstorm: {
    day: new URL(
      "../assets/WeatherCard/Weather=Storm, Time=Day.png",
      import.meta.url,
    ).href,
    night: new URL(
      "../assets/WeatherCard/Weather=Storm, Time=Night.png",
      import.meta.url,
    ).href,
  },
};
