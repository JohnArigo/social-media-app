export type FindWeatherType = {
  DateSelected?: Date;
  weatherDescription?: number;
};

export const WeatherBackground = ({
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
  const backgroundString =
    "w-96 h-44 flex flex-row flex-wrap self-center justify-between rounded-xl shadow-md";
  const dateHour = DateSelected!.getHours();
  if (dateHour >= 17 || dateHour < 6) {
    if (weatherDescription === 800) {
      return `bg-gradient-to-tr from-indigo-500 to-indigo-50 ${backgroundString}`;
    } else if (thunderWeather.includes(weatherDescription!)) {
      return `bg-gradient-to-tr from-gray-300 to-gray-500 ${backgroundString}`;
    } else if (rainyNightWeather.includes(weatherDescription!)) {
      return `bg-gradient-to-tr from-gray-50 to-gray-400 ${backgroundString}`;
    } else if (snowWeather.includes(weatherDescription!)) {
      return `bg-gradient-to-tr from-gray-50 to-gray-200 ${backgroundString}`;
    } else if (cloudWeather.includes(weatherDescription!)) {
      return `bg-gradient-to-tr from-gray-50 to-gray-100 ${backgroundString}`;
    } else if (timeCloudWeather.includes(weatherDescription!)) {
      return `bg-gradient-to-tr from-indigo-500 to-indigo-50 ${backgroundString}`;
    }
  } else {
    if (weatherDescription === 800) {
      return `bg-gradient-to-tr from-blue-500 to-blue-50 ${backgroundString}`;
    } else if (thunderWeather.includes(weatherDescription!)) {
      return `bg-gradient-to-tr from-gray-300 to-gray-500 ${backgroundString}`;
    } else if (rainyNightWeather.includes(weatherDescription!)) {
      return `bg-gradient-to-tr from-gray-50 to-gray-400${backgroundString}`;
    } else if (snowWeather.includes(weatherDescription!)) {
      return `bg-gradient-to-tr from-gray-50 to-gray-200 ${backgroundString}`;
    } else if (cloudWeather.includes(weatherDescription!)) {
      return `bg-gradient-to-tr from-gray-50 to-gray-100 ${backgroundString}`;
    } else if (timeCloudWeather.includes(weatherDescription!)) {
      return `bg-gradient-to-tr from-blue-500 to-blue-50 ${backgroundString}`;
    }
  }
};
