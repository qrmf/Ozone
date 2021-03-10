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

export type commandHandler =
  (client: Discord.Client, config: Config, message: Discord.Message, commandInfo: CommandStructure) => void;

export interface CommandHandler {
  run: commandHandler;
  name: string;
  help: string;
  keywords: Array<string>;
}

export interface CommandStructure {
  commandName: string;
  parameters: Array<string>;
  userInfo: Discord.User;
}

export interface Config {
  api: {
    OpenWeatherMap: {
      apiKey: string;
    }
  }
  discord: {
    bot: {
      token: string;
      user: {
        discriminator: number;
        username: string;
      }
    }
    client: {
      ID: string;
      secret: string;
    }
    publicKey: string;
  }
  program: {
    commandPrefix: string;
    name: string;
    version: string;
  }
}

export interface CompassDirection {
  short: string;
  long: string;
}

export interface EventHandler {
  run?(client: Discord.Client, config: Config): (...args: any) => void;
  exists: boolean;
}

export interface WeatherData {
  iconURL: string;
  requestTime: Date;
  sun: {
    rise: Date;
    set: Date;
  }
  temperature: {
    humidity: number;
    feelsLike: number;
    pressure: number;
    realTemperature: number;
  }
  weatherDescription: string;
  wind: {
    speed: number;
    direction: number;
  }
}