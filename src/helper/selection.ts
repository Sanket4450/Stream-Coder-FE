import { Tab } from '../interfaces/common'
import { CONSTANTS } from './constants'

export const TABS: Tab[] = [
  { value: CONSTANTS.LIVE_PREVIEW_VALUE, label: CONSTANTS.LIVE_PREVIEW },
  { value: CONSTANTS.CHAT_VALUE, label: CONSTANTS.CHAT },
  { value: CONSTANTS.TERMINAL_VALUE, label: CONSTANTS.TERMINAL },
]
