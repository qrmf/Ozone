/**
 * Project Ozone - A regular, good ol' fasioned Discord bot.
 * Copyright (C) 2021  Alexander McDonald <qrmf.dev@outlook.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import axios from 'axios';

import { Config, WeatherData } from '../types';
import { eventLogger } from './logger';

function generateOWMAPIURL(location: string, apiKey: string): string {
  return `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
}

function parseWeatherData(weatherData: any): WeatherData {
  const weather: WeatherData = {
    iconURL: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
    requestTime: new Date(weatherData.dt * 1000),
    sun: {
      rise: new Date(weatherData.sys.sunrise * 1000),
      set: new Date(weatherData.sys.sunset * 1000)
    },
    temperature: {
      feelsLike: weatherData.main.feels_like,
      humidity: weatherData.main.humidity,
      pressure: weatherData.main.pressure / 100,
      realTemperature: weatherData.main.temp
    },
    weatherDescription: weatherData.weather[0].description,
    wind: {
      direction: weatherData.wind.deg,
      // The 3.6 comes from 60 * 60 / 1000
      speed: weatherData.wind.speed * 3.6
    }
  };

  return weather;
}

export default async function getWeatherData(config: Config, location: string): Promise<WeatherData | string> {
  eventLogger('Command::Weather::APICall', `Making OpenWeatherMap API Call for city ${location}`);

  try {
    const res = await axios.get(generateOWMAPIURL(location, config.api.OpenWeatherMap.apiKey));
  
    if (res.data.message) return res.data.message;

    const parsedWeatherData: WeatherData = parseWeatherData(res.data);
  
    return parsedWeatherData;
  } catch(err) {}

  return 'Robot malfunction';
}