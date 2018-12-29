import { message } from 'antd'
import request from '@/utils/request'
import { Ajax } from '../interface'

export const login = (data: Ajax.Submit.Request) => {
  return request({
    url: '/user/login',
    method: 'post',
    data
  }).then((res: AjaxResponse<Ajax.Submit.Response>) => {
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
