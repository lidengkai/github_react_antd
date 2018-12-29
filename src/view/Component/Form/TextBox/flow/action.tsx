import store from '@/store'
import history from '@/history'
import { NAME } from './constant'
import { init, commit } from './store'
import * as requests from '../api/requests'
import { FormInterface, StateInterface } from '../interface'
import formatter from '@/utils/formatter'
import validate from '@/utils/validate'
import { message } from 'antd'

const getState: GetState<typeof NAME, StateInterface> = (key = NAME) => {
  const state: any = store.getState()
  return state[key] || {}
}

export async function initPage() {
  store.dispatch(init())
}

export async function submit(values: FormInterface) {
  console.log(values)
}
