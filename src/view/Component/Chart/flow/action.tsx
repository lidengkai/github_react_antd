import store from '@/store'
import history from '@/history'
import { NAME } from './constant'
import { init, commit } from './store'
import * as requests from '../api/requests'
import { StateInterface, MapDataItemInterface } from '../interface'
import formatter from '@/utils/formatter'
import validate from '@/utils/validate'
import { message } from 'antd'

const getState: GetState<typeof NAME, StateInterface> = (key = NAME) => {
  const state: any = store.getState()
  return state[key] || {}
}

export async function initPage() {
  store.dispatch(init())
  store.dispatch(commit({
    lineLoading: true,
    mapLoading: true
  }))
  requests.requestLineData().then(lineData => {
    store.dispatch(commit({
      lineLoading: false,
      lineData
    }))
  })
  requests.requestMapData().then(mapData => {
    store.dispatch(commit({
      mapLoading: false,
      mapData
    }))
  })
}


export async function clickMap(_: any, data: MapDataItemInterface) {
  const { value1, value2, value3 } = data
  store.dispatch(commit({ pieData: { value1, value2, value3 } }))
}
