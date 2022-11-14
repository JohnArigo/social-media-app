import clearNight from "./ClearNight.png";
import clearSun from "./clearSun.png";
import rainyNight from "./rainyNight.png";
import sunRainy from "./sunRainy.png";
import snow from "./snow.png";
import thunder from "./thunder.png";
import clouds from "./clouds.png";
import nightCloud from "./nightCloud.png";
import dayCloud from "./dayCloud.png";

export type FindWeatherType = {
  DateSelected?: Date;
  weatherDescription?: number;
};

export const FindWeatherIcon = ({
  DateSelected,
  weatherDescription,
}: FindWeatherType) => {
  const thunderWeather = [200, 201, 202, 210, 211, 212, 221, 230, 231, 232];
  const rainyNightWeather = [
    300, 301, 302, 310, 321, 313, 314, 321, 520, 521, 522, 531,
  ];
  const snowWeather = [
    511, 600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622,
  ];
  const cloudWeather = [701, 711, 721, 731, 741, 751, 761, 762, 771, 781];
  const timeCloudWeather = [801, 802, 803, 804];

  const dateHour = DateSelected!.getHours();
  if (dateHour >= 17 || dateHour < 6) {
    if (weatherDescription === 800) {
      return clearNight;
    } else if (thunderWeather.includes(weatherDescription!)) {
      return thunder;
    } else if (rainyNightWeather.includes(weatherDescription!)) {
      return rainyNight;
    } else if (snowWeather.includes(weatherDescription!)) {
      return snow;
    } else if (cloudWeather.includes(weatherDescription!)) {
      return clouds;
    } else if (timeCloudWeather.includes(weatherDescription!)) {
      return nightCloud;
    }
  } else {
    if (weatherDescription === 800) {
      return clearSun;
    } else if (thunderWeather.includes(weatherDescription!)) {
      return thunder;
    } else if (rainyNightWeather.includes(weatherDescription!)) {
      return rainyNight;
    } else if (snowWeather.includes(weatherDescription!)) {
      return snow;
    } else if (cloudWeather.includes(weatherDescription!)) {
      return clouds;
    } else if (timeCloudWeather.includes(weatherDescription!)) {
      return dayCloud;
    }
  }
};
