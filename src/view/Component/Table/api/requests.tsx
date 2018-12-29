import { message } from 'antd'
import request from '@/utils/request'
import { Ajax } from '../interface'

export const list = (opts: Ajax.List.Request): AjaxReturn<Ajax.List.Response> => {
  const { current, pageSize, ...data } = opts
  return request({
    url: `/test/${current}/${pageSize}`,
    method: 'post',
    data
  }).then((res: AjaxResponse<Ajax.List.Response>) => {
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

export const get = (opts: Ajax.Info.Request): AjaxReturn<Ajax.Info.Response> => {
  const { id } = opts
  return request({
    url: `/test/${id}`,
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

export const set = (opts: Ajax.Set.Request) => {
  const { id, ...data } = opts
  return request({
    url: id ? `/test/${id}` : `/test`,
    method: id ? 'put' : 'post',
    data
  }).then((res: AjaxResponse<Ajax.Set.Response>) => {
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

export const del = (opts: Ajax.Del.Request) => {
  const { id } = opts
  return request({
    url: `/test/${id}`,
    method: 'delete'
  }).then((res: AjaxResponse<Ajax.Del.Response>) => {
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
