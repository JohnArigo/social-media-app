import { useEffect, useState } from "react";
import Current from "../components/WeatherComponent/Current";
import { RootConfig } from "../components/WeatherComponent/CurrenWeatherConfig";
import { ExploreType } from "../lib/types";

export async function getStaticProps() {
  //fetch geo data
  const request = await fetch(
    `https://ipinfo.io/json?token=${process.env.GEO_KEY}`
  );
  const jsonResponse = await request.json();

  //fetch weather data
  const requestWeather = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?zip=${jsonResponse.postal},US&appid=${process.env.WEATHER_KEY}&units=imperial`
  );
  const weatherResponse = await requestWeather.json();

  return {
    props: {
      weather: weatherResponse,
      geoLocation: jsonResponse,
    },
  };
}

export default function Explore({ geoLocation, weather }: ExploreType) {
  const [geoData, setGeoData] = useState(geoLocation);
  const [currentWeather, setCurrentWeather] = useState<RootConfig>(weather);

  return (
    <main>
      <Current currentWeather={currentWeather} />
    </main>
  );
}
