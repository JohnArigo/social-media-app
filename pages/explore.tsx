import { useEffect, useState } from "react";
import Current from "../components/WeatherComponent/Current";
import { RootConfig } from "../components/WeatherComponent/CurrenWeatherConfig";
import { ExploreType } from "../lib/types";

export async function getStaticProps() {
  //fetch geo data
  const request = await fetch("https://ipinfo.io/json?token=ff5d8d84fee3a7");
  const jsonResponse = await request.json();

  //fetch weather data
  const requestWeather = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?zip=${jsonResponse.postal},US&appid=2236f63a213497e7540ce550e394c5c0&units=imperial`
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
