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
import { checkUserHasPermission } from '../util/checkPermissions';
 
async function commandHandler(
   client: Discord.Client, config: Config, message: Discord.Message, commandInfo: CommandStructure
 ): Promise<void> {
  const continueDeletion: boolean = checkUserHasPermission(
    (message.guild?.member(message.author) as Discord.GuildMember),
    'MANAGE_CHANNELS');

  if (!continueDeletion) {
    message.author.send('You don\'t have the MANAGE_CHANNELS permission, so you can\'t delete messages.')
      .then(message => message.delete({ timeout: 30000 }));
  } else {
    (message.channel as Discord.TextChannel).bulkDelete(Number(commandInfo.parameters[0]) || 100);
  }
}
 
 export default function registerCommandHandler(config: Config): CommandHandler {
   return {
     help: 'Clears the channel of messages',
     keywords: ['clear', 'cls', 'rm'],
     name: 'clear',
     run: commandHandler
   }
 }