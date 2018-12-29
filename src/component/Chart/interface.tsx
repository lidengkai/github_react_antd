import { EChartOption, EChartsResponsiveOption } from 'echarts/lib/echarts'

// formatedInfo
export interface FormatedInfo {
  name?: string
  key?: string
  value?: any
}

// configItem
export interface ChartConfigItemInterface {
  value: string
  title: string
  /**
   * @prop {string} name
   */
  name?: string
  /**
   * @prop {'line'|'bar'} type
   */
  type?: 'line' | 'bar'
  /**
   * @prop {string | ((value: any) => string)} axisLabelFormatter
   */
  axisLabelFormatter?: string | ((value: any) => string)
  /**
   * @prop {string | ((info: FormatedInfo, dataInfo: any, echartInfo: any) => string)} tooltipFormatter
   * @access Chart.Line Chart.Map
   */
  tooltipFormatter?: string | ((info: FormatedInfo, dataInfo: any, echartInfo: any) => string)
}

// config
export type ChartConfigInterface = ChartConfigItemInterface[]

// option
export type OptionInterface = EChartOption | EChartsResponsiveOption | null

// data
export interface DataInterface {
  [x: string]: any
}

// getColor
export interface getColorInterface {
  (index: number, isLight?: boolean): string
}

// Chart
export interface ChartProps {
  config?: ChartConfigInterface
  configValue?: string[]
  showConfig?: boolean
  onChangeConfig?(value: string[]): void
  smallConfig?: boolean
  configSize?: number
  loading?: boolean
  option?: OptionInterface
  height?: number
  onClick?(info: any): void
}

// Line
export interface LineProps {
  loading?: boolean
  config?: ChartConfigInterface
  data?: DataInterface[]
  xKey?: string
  showConfig?: boolean
  smallConfig?: boolean
  height?: number
  onClick?(info: FormatedInfo, dataInfo: any, echartInfo: any): void
}

// Map
export interface MapProps {
  loading?: boolean
  config?: ChartConfigInterface
  data?: DataInterface[]
  xKey?: string
  showConfig?: boolean
  smallConfig?: boolean
  height?: number
  onClick?(info: FormatedInfo, dataInfo: any, echartInfo: any): void
}

// Pie
export interface PieProps {
  loading?: boolean
  config?: ChartConfigInterface
  data?: DataInterface
  showConfig?: boolean
  smallConfig?: boolean
  height?: number
  onClick?(info: FormatedInfo, dataInfo: any, echartInfo: any): void
  tooltipFormatter?: string | ((info: FormatedInfo, dataInfo: any, echartInfo: any) => string)
}
