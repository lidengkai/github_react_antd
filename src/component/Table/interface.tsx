import {
  TableProps as TProps,
  ColumnsType as TableColumnsInterface
} from 'antd/lib/table'

// columns
export { TableColumnsInterface }

// onChange
export interface TableOnChangeParamsInterface {
  current?: number
  pageSize?: number
  filters?: any
  sort?: string
  order?: string
}

// Table
export interface TableProps extends TProps<any> {
  /**
   * @prop {string|number} y 高度
   */
  y?: string | number
  /**
   * @prop {(opt):void} onChange change事件
   * @param {any} opt 配置
   * @param {number} opt.current 当前页
   * @param {number} opt.pageSize 单页数据量
   * @param {string} opt.sort 排序字段
   * @param {string} opt.order 排序规则
   * @param {any} opt.filters 筛选项
   */
  onChange?(opt: TableOnChangeParamsInterface): void
}

// Link
export interface LinkProps {
  children?: ReactNode
  /**
   * @prop {any} value 值
   */
  value?: any
  /**
   * @prop {any} row 元数据
   */
  row?: any
  /**
   * @prop {(value, row): void} onClick 点击事件、提交事件
   * @param {any} value 值
   * @param {any} row 元数据
   */
  onClick?(value: any, row: any): void
  /**
   * @prop {string} comfirm 二次确认
   */
  comfirm?: string
  className?: string
  style?: CSSProperties
}

// VirtualScroll
export interface VirtualScrollProps extends TableProps {
  rowHeight?: number | ((row?: any, index?: number) => number)
}
