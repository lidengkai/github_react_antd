import InternalHour from './Hour'
import { HourProps } from './interface'

declare namespace Hour {
  type Props = HourProps
}

declare const Hour: typeof InternalHour

export default Hour
