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

import { CommandHandler, CommandStructure, Config } from '../types';
import { commandLogger } from '../util/logger';

function commandHandler(
  client: Discord.Client, config: Config, message: Discord.Message, commandInfo: CommandStructure
): void {
  const messageCreatedTimestamp: number = message.createdTimestamp;
  const latency: number = Date.now() - messageCreatedTimestamp;

  commandLogger('Ping', `Latency is ${latency}ms`)
  message.channel.send(`Pong!\nLatency is ${latency}ms`);
}

export default function registerCommandHandler(config: Config): CommandHandler {
  return {
    help: 'Displays the latency between the bot and the server',
    keywords: ['ping'],
    name: 'ping',
    run: commandHandler
  }
}