import { INIT, COMMIT } from './constant'
import { StateInterface } from '../interface'

const initialState: StateInterface = {
  lineLoading: false,
  lineData: [],
  mapLoading: false,
  mapData: [],
  pieData: {
    value1: 0,
    value2: 0,
    value3: 0
  }
}

export default (state = initialState, action: any) => {
  const { type, data } = action
  switch (type) {
    case INIT:
      return { ...initialState }
    case COMMIT:
      return { ...state, ...data }
    default:
      return { ...state }
  }
}

export const init = () => {
  return { type: INIT }
}

export const commit = (data: Partial<StateInterface> = {}) => {
  return { type: COMMIT, data }
}
