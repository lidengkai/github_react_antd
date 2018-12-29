import { message } from 'antd'
import request from '@/utils/request'
import { STATIC } from '@/config'
import {
  UploadRequestInterface,
  FileInterface,
  InitFileListInterface,
  ReadFileListInterface
} from './interface'

export const STATIC_PREFIX = STATIC
export const DEFAULT_METHOD = 'post'
export const DEFAULT_ACTION = '/file/upload'
export const DEFAULT_NAME = 'file'
export const DEFAULT_DATA = {}

export const getServerPath = (info: any) => {
  // override:name
  const { name } = info || {}
  return name ? STATIC_PREFIX + name : ''
}

export const upload = (obj: UploadRequestInterface) => {
  const { method, action, name, file, data } = obj
  const formData = new FormData()
  formData.append(name, file)
  if (data) {
    for (let key in data) {
      formData.append(key, data[key])
    }
  }
  return request({
    url: action,
    method,
    data: formData
  }).then((res: any) => {
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

export const initFileList: InitFileListInterface = (list) => {
  const data: FileInterface[] = []
  const key = Date.now()
  if (list instanceof Array) {
    for (let i = 0, l = list.length; i < l; i++) {
      const item = list[i]
      if (item) {
        data.push({
          uid: `-${key}-${i}`,
          status: 'done',
          url: getServerPath(item),
          // override:name
          name: item.name,
          // override:type
          type: item.type,
          response: item
        })
      }
    }
  }
  return data
}

export const readFileList: ReadFileListInterface = (list) => {
  const data = []
  if (list instanceof Array) {
    for (const item of list) {
      if (item && item.status === 'done') {
        data.push(item.response)
      }
    }
  }
  return data
}
