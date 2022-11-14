import { RootConfig } from "./CurrenWeatherConfig";
import humidity from "./humidity.png";
import wind from "../../components/WeatherComponent/wind.png";
import { WeatherBackground } from "./WeatherBackground";
import { FindWeatherIcon } from "./FindImage";
import Image from "next/image";

export type WeatherConfiguration = {
  currentWeather: RootConfig;
};

export default function Current({ currentWeather }: WeatherConfiguration) {
  const weatherDescription = currentWeather?.weather[0].id;
  const DateSelected = new Date();
  return (
    <main role="container" className="mt-10 flex flex-col text-gray-50">
      <div className="w-full text-center text-xl text-info">
        {currentWeather?.name === undefined
          ? "Enter Zipcode"
          : currentWeather?.name}
      </div>
      <section
        className={WeatherBackground({ DateSelected, weatherDescription })}
      >
        <section className="flex flex-row justify-between ml-1 w-7/12 h-full items-end ">
          <aside className="flex flex-col mt-4">
            <div className="flex flex-col">
              <div className="text-sm">
                {currentWeather?.weather[0].description}
              </div>
              <div className="text-4xl mt-1">
                {Math.round(currentWeather?.main.temp!)}F
              </div>
            </div>
            <div className="flex flex-row text-xs mt-3 mb-3">
              <div>L: {Math.round(currentWeather?.main.temp_min!)}F</div>
              <div className="ml-2">
                H: {Math.round(currentWeather?.main.temp_max!)}F
              </div>
            </div>
          </aside>
          <section className="flex flex-row h-full items-end mb-3">
            <div className="mr-3  flex flex-row items-center">
              <div className="mr-1">
                {Math.round(currentWeather?.main.humidity!)}
              </div>
              <div>
                <Image src={humidity} height={12} width={12} />
              </div>
            </div>
            <div className="flex flex-row items-center">
              <div className="mr-1">
                {Math.round(currentWeather?.wind.speed!)}
              </div>
              <div>
                <Image src={wind} height={12} width={12} />
              </div>
            </div>
          </section>
        </section>
        <section className="w-24 h-24 flex flex-row justify-end">
          <Image src={FindWeatherIcon({ DateSelected, weatherDescription })!} />
        </section>
      </section>
    </main>
  );
}
