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

import { CompassDirection } from '../types'

export default function convertDegreesToCompassDirection(degrees: number): CompassDirection {
  // North
  if (degrees > 337.25 || degrees < 22.5)
    return { short: 'N', long: 'North' }
  // North East
  else if (degrees >= 22.5 && degrees <= 67.5)
    return { short: 'NE', long: 'North East' }
  // East
  else if (degrees > 67.5 && degrees < 112.5)
    return { short: 'E', long: 'East' }
  // South East
  else if (degrees >= 112.5 && degrees <= 157.5)
    return { short: 'SE', long: 'South East' }
  // South
  else if (degrees > 157.5 && degrees < 202.5)
    return { short: 'S', long: 'South' }
  // South West
  else if (degrees >= 202.5 && degrees <= 247.5)
    return { short: 'SW', long: 'South West' }
  // West
  else if (degrees > 247.5 && degrees < 292.5)
    return { short: 'W', long: 'West' }
  // North West
  else if (degrees >= 292.5 && degrees <= 337.5)
    return { short: 'NW', long: 'North West' }
  
  return { short: '', long: '' }
}