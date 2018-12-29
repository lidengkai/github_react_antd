import InternalChart from './Chart'
import InternalLine from './Line'
import InternalMap from './Map'
import InternalPie from './Pie'
import {
  ChartProps,
  LineProps,
  MapProps,
  PieProps
} from './interface'

declare namespace Chart {
  type Props = ChartProps
  namespace Line {
    type Props = LineProps
  }
  namespace Map {
    type Props = MapProps
  }
  namespace Pie {
    type Props = PieProps
  }
}

declare namespace Line {
  type Props = LineProps
}

declare namespace Map {
  type Props = MapProps
}

declare namespace Pie {
  type Props = PieProps
}

declare const Chart: typeof InternalChart & {
  Line: typeof InternalLine
  Map: typeof InternalMap
  Pie: typeof InternalPie
}

export declare const Line: typeof InternalLine

export declare const Map: typeof InternalMap

export declare const Pie: typeof InternalPie

export default Chart
