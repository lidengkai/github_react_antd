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

export async function validateUsername(value: string) {
  const v = formatter.trim(value)
  if (!v) {
    return Promise.reject('用户名不能为空')
  }
}

export async function validatePassword(value: string) {
  const v = formatter.trim(value)
  if (!v) {
    return Promise.reject('密码不能为空')
  }
}

export async function submit(values: FormInterface) {
  const { username, password, remember } = values
  console.log(remember)
  const res = await requests.login({
    username: formatter.trim(username),
    password: formatter.trim(password)
  })
  if (res) {
    history.push('/')
  }
}
