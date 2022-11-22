import Link from "next/link";
import { useEffect, useState } from "react";
import News from "../components/news";
import Current from "../components/WeatherComponent/Current";
import { RootConfig } from "../components/WeatherComponent/CurrenWeatherConfig";
import { ExploreType, geoLocationType } from "../lib/types";

export async function getStaticProps() {
  //fetch geo data
  const request = await fetch(
    `https://ipinfo.io/json?token=${process.env.GEO_KEY}`
  );
  const jsonResponse: geoLocationType = await request.json();

  //fetch weather data
  const requestWeather = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?zip=${jsonResponse.postal},US&appid=${process.env.WEATHER_KEY}&units=imperial`
  );
  const weatherResponse = await requestWeather.json();

  const newsRequest = await fetch(
    `https://newsapi.org/v2/top-headlines?country=${
      jsonResponse.country
    }&apiKey=${[process.env.NEWS_KEY]}`
  );
  const newsResponse = await newsRequest.json();

  return {
    props: {
      news: newsResponse,
      weather: weatherResponse,
      geoLocation: jsonResponse,
    },
  };
}

export default function Explore({ geoLocation, weather, news }: ExploreType) {
  const [geoData, setGeoData] = useState(geoLocation);
  const [currentWeather, setCurrentWeather] = useState<RootConfig>(weather);

  return (
    <main className="bg-base-200 mb-24 sm: pt-24">
      <Current currentWeather={currentWeather} />
      <h1 className="text-center mt-14 text-info text-xl">Top Headlines</h1>
      <News news={news} />
    </main>
  );
}
