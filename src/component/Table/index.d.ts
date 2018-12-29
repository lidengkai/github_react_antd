import InternalTable from './Table'
import InternalLink from './Link'
import InternalVirtualScroll from './VirtualScroll'
import {
  TableColumnsInterface,
  TableOnChangeParamsInterface,
  TableProps,
  LinkProps,
  VirtualScrollProps
} from './interface'

declare namespace Link {
  type Props = LinkProps
}

declare namespace VirtualScroll {
  type Props = VirtualScrollProps
}

declare namespace Table {
  type ColumnsInterface = TableColumnsInterface
  type OnChangeParamsInterface = TableOnChangeParamsInterface
  type Props = TableProps
  namespace Link {
    type Props = LinkProps
  }
  namespace VirtualScroll {
    type Props = VirtualScrollProps
  }
}

declare const Table: typeof InternalTable & {
  Link: typeof InternalLink
  VirtualScroll: typeof InternalVirtualScroll
}

export declare const Link: typeof InternalLink

export declare const VirtualScroll: typeof InternalVirtualScroll

export default Table
