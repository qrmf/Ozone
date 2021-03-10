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

import Discord from 'discord.js';

import { CommandHandler, CommandStructure, Config, WeatherData } from '../types';
import { formatDateISO8601 } from '../util/dateTime';
import convertDegreesToCompassDirection from '../util/degreesToCompassDirection';
import getWeatherData from '../util/openWeatherMap';
 
async function commandHandler(
   client: Discord.Client, config: Config, message: Discord.Message, commandInfo: CommandStructure
): Promise<void> {
  const weather: WeatherData | string = await getWeatherData(config, commandInfo.parameters[0]);

  if (typeof weather === 'string') {
    const errorMessage: string = `Error: ${weather}\n\nCommand: ${config.program.commandPrefix}${commandInfo.commandName} ${commandInfo.parameters.join(' ')}`;
    
    message.reply(errorMessage);
  } else {
    const embedMessage: Discord.MessageEmbed = new Discord.MessageEmbed()
      .setAuthor(
        'OpenWeather',
        'https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/icons/logo_60x60.png',
        'https://openweathermap.org/')
      .setColor([234, 109, 75])
      .setDescription(weather.weatherDescription)
      .setFooter(`Requested by @${commandInfo.userInfo.tag}`)
      .setThumbnail(weather.iconURL)
      .setTimestamp(weather.requestTime)
      .setTitle(`Weather report for ${commandInfo.parameters[0]}`)
      .addField('Temperature (Real)', weather.temperature.realTemperature, true)
      .addField('Temperature (Feels Like)', weather.temperature.feelsLike, true)
      .addField('Humidity', `${weather.temperature.humidity}%`, true)
      .addField('Pressure', `${weather.temperature.pressure} Pa`, true)
      .addField('Wind Speed', `${Math.round(weather.wind.speed)} km/h`, true)
      .addField('Wind Direction', convertDegreesToCompassDirection(weather.wind.direction).long, true)
      .addField(`Sunrise`, formatDateISO8601(weather.sun.rise), true)
      .addField('Sunset', formatDateISO8601(weather.sun.set), true);

    message.channel.send(embedMessage);
  }
}
 
export default function registerCommandHandler(config: Config): CommandHandler {
  return {
    help: `Usage: ${config.program.commandPrefix}weather <City Name>`,
    keywords: ['weather'],
    name: 'weather',
    run: commandHandler
  }
}