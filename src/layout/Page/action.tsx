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
  await store.dispatch(appCommit({ loading: true }))
  const res = await requests.userInfo()
  if (res) {
    const { id, role, username } = res
    store.dispatch(appCommit({ id, role, username, loading: false }))
  } else {
    history.push('/user/login')
  }
}

export async function logout() {
  const res = await requests.logout()
  if (res) {
    history.push('/user/login')
  }
}
