import InternalTree from './Tree'
import InternalDouble from './Double'
import {
  TreeProps,
  DoubleProps
} from './interface'

declare namespace Tree {
  type Props = TreeProps
  namespace Double {
    type Props = DoubleProps
  }
}

declare namespace Double {
  type Props = DoubleProps
}

declare const Tree: typeof InternalTree & {
  Double: typeof InternalDouble
}

export declare const Double: typeof InternalDouble

export default Tree
