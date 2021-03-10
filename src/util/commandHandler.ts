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

import { Client, Message } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';

import { CommandHandler, CommandStructure, Config } from '../types';
import { eventLogger } from '../util/logger';

const registeredCommandHandlers: Array<CommandHandler> = [];

function findCommandHandler(commandName: string): CommandHandler {
  const commandHandler: CommandHandler = registeredCommandHandlers.filter(commandHandler =>
    commandHandler.keywords.filter(commandKeyword =>
      commandKeyword === commandName)[0])[0];

  return commandHandler;
}

export function callHandler(
  client: Client, config: Config, message: Message, commandInfo: CommandStructure
): void {  
  if (commandInfo.commandName === 'help') {
    const commandHandler: CommandHandler = findCommandHandler(commandInfo.parameters[0]);

    message.channel.send(commandHandler.help)
      .then(message => message.delete({ timeout: 30000 }));
  } else {
    const commandHandler: CommandHandler = findCommandHandler(commandInfo.commandName);

    commandHandler.run(client, config, message, commandInfo);
  }
}

export default function registerHandlers(client: Client, config: Config): void {
  // Command Handler Directory
  const commandHandlerDirectory: string = join(__dirname, '../commands')
  
  // Get all command handlers
  const commandHandlers: Array<string> = readdirSync(commandHandlerDirectory);

  // Iterate over found command handlers and register them.
  for (const commandHandler of commandHandlers) {
    registeredCommandHandlers.push(require(join(
      commandHandlerDirectory, commandHandler
    )).default(config));

    eventLogger('Message::CommandHandler', `Loaded Command: ${commandHandler.replace('.js', '')}`);
  }
}