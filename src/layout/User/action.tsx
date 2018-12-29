import store from '@/store'
import history from '@/history'
import { APP_STORE, appInit, appCommit, AppStateInterface } from '@/config'
import * as requests from './requests'
import formatter from '@/utils/formatter'
import { message } from 'antd'

const getState: GetState<typeof APP_STORE, AppStateInterface> = (key = APP_STORE) => {
  const state: any = store.getState()
  return state[key] || {}
}

export async function initPage() {
  await store.dispatch(appInit())
}
