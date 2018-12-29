// data
export interface TreeDataItemInterface {
  /**
   * @prop {string} key 值
   */
  key: string
  /**
   * @prop {ReactNode} title 文本
   */
  title?: ReactNode
  /**
   * @prop {string} search 搜索时匹配的文本，当title为字符串默认取title值
   */
  search?: string
  /**
   * @prop {string} children 递归
   */
  children?: TreeDataItemInterface[]
}

export type TreeDataInterface = TreeDataItemInterface[]

// default
export interface DefaultProps {
  data?: TreeDataInterface
  value?: string[] | string
  onChange?(value: string[] | string): void
  multiple?: boolean
  disabled?: boolean
  leafValue?: boolean
  search?: string
  readonly?: boolean
}

// Double
export interface DoubleProps {
  /**
   * @prop {any[]} data 数据
   * @prop {string} data[].key 值
   * @prop {ReactNode} data[].title 文本
   * @prop {string} data[].search 搜索时匹配的文本，当title为字符串默认取title值
   * @prop {string} data[].children 递归
   */
  data?: TreeDataInterface
  /**
   * @prop {string[]|string} 值，多选时为数组
   */
  value?: string[] | string
  /**
   * @prop {(value):void} onChange change事件
   * @param {string[]|string} 值，多选时为数组
   */
  onChange?(value: string[] | string): void
  /**
   * @prop {boolean} multiple 多选，默认为true
   */
  multiple?: boolean
  /**
   * @prop {boolean} disabled 禁用
   */
  disabled?: boolean
  /**
   * @prop {boolean} leafValue 返回值仅包含叶子节点，多选时有效
   */
  leafValue?: boolean
  /**
   * @prop {boolean|string} search 开启搜索，字符串为placeholder
   */
  search?: boolean | string
  /**
   * @prop {string} title 标题
   */
  title?: string
}

// Tree
export interface TreeProps {
  /**
   * @prop {any[]} data 数据
   * @prop {string} data[].key 值
   * @prop {ReactNode} data[].title 文本
   * @prop {string} data[].search 搜索时匹配的文本，当title为字符串默认取title值
   * @prop {string} data[].children 递归
   */
  data?: TreeDataInterface
  /**
   * @prop {string[]|string} 值，多选时为数组
   */
  value?: string[] | string
  /**
   * @prop {(value):void} onChange change事件
   * @param {string[]|string} 值，多选时为数组
   */
  onChange?(value: string[] | string): void
  /**
   * @prop {boolean} multiple 多选，默认为true
   */
  multiple?: boolean
  /**
   * @prop {boolean} disabled 禁用
   */
  disabled?: boolean
  /**
   * @prop {boolean} leafValue 返回值仅包含叶子节点，多选时有效
   */
  leafValue?: boolean
  /**
   * @prop {boolean|string} search 开启搜索，字符串为placeholder
   */
  search?: boolean | string
}
