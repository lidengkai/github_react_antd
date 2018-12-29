import store from '@/store'
import history from '@/history'
import { NAME } from './constant'
import { init, commit } from './store'
import * as requests from '../api/requests'
import { ModalInfoFormInterface, StateInterface, DataSourceItemInterface } from '../interface'
import formatter from '@/utils/formatter'
import validate from '@/utils/validate'
import { message } from 'antd'
import Table from '@/component/Table'

const getState: GetState<typeof NAME, StateInterface> = (key = NAME) => {
  const state: any = store.getState()
  return state[key] || {}
}

// 请求表格数据
async function requestTable() {
  const { name, filters, sort, order, current, pageSize } = getState()
  const { status } = filters
  store.dispatch(commit({ loading: true }))
  const res = await requests.list({
    name,
    status: status?.[0],
    sort,
    order,
    current,
    pageSize
  })
  if (res) {
    const { count: total = 0, rows: dataSource = [] } = res
    // 当前页没有数据，返回首页
    if (!dataSource.length && current > 1) {
      store.dispatch(commit({ current: 1 }))
      await requestTable()
      return
    }
    store.dispatch(commit({
      loading: false,
      total,
      dataSource
    }))
  } else {
    store.dispatch(commit({ loading: false }))
  }
}

// 初始化
export async function initPage() {
  store.dispatch(init())
  await requestTable()
}

// 表格操作
export async function changeTable(opts: Table.OnChangeParamsInterface) {
  const { current, pageSize, filters, sort, order } = opts
  store.dispatch(commit({ current, pageSize, filters, sort, order }))
  await requestTable()
}

// 搜索
export async function handleSearch(name: string) {
  store.dispatch(commit({ name: formatter.trim(name) }))
  await requestTable()
}

// 启动
export async function handleStart(_: number, row: DataSourceItemInterface) {
  await requests.set({
    id: row.id,
    status: '1'
  })
  await requestTable()
}

// 暂停
export async function handlePause(_: number, row: DataSourceItemInterface) {
  await requests.set({
    id: row.id,
    status: '0'
  })
  await requestTable()
}

// 打开模态框，详情
export async function openInfo(id: number) {
  store.dispatch(commit({
    infoData: { id, type: 'info' },
    infoShow: true
  }))
}

// 初始化模态框
export async function initInfo(id: number) {
  store.dispatch(commit({ infoLoading: true }))
  const res = await requests.get({ id })
  if (res) {
    store.dispatch(commit({ infoLoading: false }))
  } else {
    store.dispatch(commit({ infoShow: false }))
  }
  return res
}

// 关闭模态框
export async function closeInfo() {
  store.dispatch(commit({ infoShow: false }))
}

// 修改详情
export async function submitInfo(values: ModalInfoFormInterface) {
  const { id, name, value } = values
  const res = await requests.set({
    id,
    name: formatter.trim(name),
    value: formatter.numberString(value)
  })
  if (res) {
    store.dispatch(commit({ infoShow: false }))
    requestTable()
  }
}

// 删除
export async function delInfo(id: number) {
  const res = await requests.del({ id })
  if (res) {
    requestTable()
  }
}

// 打开模态框，编辑
export async function openEdit(id: number) {
  store.dispatch(commit({
    infoData: { id, type: 'edit' },
    infoShow: true
  }))
}

// 打开模态框，添加
export async function openAdd() {
  store.dispatch(commit({
    infoData: { type: 'add' },
    infoShow: true
  }))
}

// 校验
const regName = validate.string(0, 10)
export async function validateName(value: any) {
  const v = formatter.trim(value)
  if (!v) {
    return Promise.reject('名称不能为空')
  }
  if (!regName.test(v)) {
    return Promise.reject('名称不能超过10个字')
  }
}

const regValue = validate.number(0, 4)
export async function validateValue(value: any) {
  const v = formatter.trim(value)
  if (!v) {
    return Promise.reject('值不能为空')
  }
  if (!(regValue.test(v))) {
    return Promise.reject('请输入0~9999之间的整数')
  }
}

// 跳转虚拟滚动
export async function toUploadCsv() {
  history.push('/component/form/upload')
}
