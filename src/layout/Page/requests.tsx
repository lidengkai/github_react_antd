import { message } from 'antd'
import request from '@/utils/request'
import { Ajax } from './interface'

export function userInfo(): AjaxReturn<Ajax.Info.Response> {
  return request({
    url: '/user/info',
    method: 'get'
  }).then((res: AjaxResponse<Ajax.Info.Response>) => {
    if (res.status === 1) {
      return res.data || {}
    }
    message.error(res.message)
    return false
  }).catch(_ => {
    message.error('服务器异常')
    return false
  })
}

export const logout = () => {
  return request({
    url: '/user/logout',
    method: 'get'
  }).then((res: AjaxResponse<Ajax.Logout.Response>) => {
    if (res.status === 1) {
      return true
    }
    message.error(res.message)
    return false
  }).catch(_ => {
    message.error('服务器异常')
    return false
  })
}
