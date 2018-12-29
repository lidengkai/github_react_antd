import store from '@/store'
import history from '@/history'
import { NAME } from './constant'
import { init, commit } from './store'
import * as requests from '../api/requests'
import { FormInterface, StateInterface } from '../interface'
import formatter from '@/utils/formatter'
import validate from '@/utils/validate'
import { message } from 'antd'
import Upload from '@/component/Upload'

const getState: GetState<typeof NAME, StateInterface> = (key = NAME) => {
  const state: any = store.getState()
  return state[key] || {}
}

export async function initPage() {
  store.dispatch(init())
  store.dispatch(commit({
    csvTabs: ['分号.csv'],
    csvList: [[]]
  }))
}

export async function submit(values: FormInterface) {
  console.log(values)
  console.log('upload:', Upload.readFileList(values.upload))
}

export async function uploadCsv(csvList: string[][][], csvTabs: string[]) {
  store.dispatch(commit({ csvTabs, csvList, tab: '0' }))
}

export async function changeTab(tab: string) {
  store.dispatch(commit({ tab }))
}
