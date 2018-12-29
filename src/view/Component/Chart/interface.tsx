// data
export interface LineDataItemInterface {
  date: string
  run: number
  time: number
  speed: number
}

export type LineDataInterface = LineDataItemInterface[]

export interface MapDataItemInterface {
  area: string
  value1: number
  value2: number
  value3: number
  total: number
}

export type MapDataInterface = MapDataItemInterface[]

export interface PieDataInterface {
  value1: number
  value2: number
  value3: number
}

// store
export interface StateInterface {
  lineLoading: boolean
  lineData: LineDataInterface
  mapLoading: boolean
  mapData: MapDataInterface
  pieData: PieDataInterface
}

// view
export namespace View {
  export interface Props extends StateInterface {
  }
}

// ajax
export namespace Ajax {
}
