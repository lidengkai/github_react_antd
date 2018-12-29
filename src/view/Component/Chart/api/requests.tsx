import { message } from 'antd'
import request from '@/utils/request'
import { Ajax } from '../interface'
import time from '@/utils/time'

const mockLineData = [{
  date: '星期一',
  run: 1554,
  time: 415
}, {
  date: '星期二',
  run: 1465,
  time: 404
}, {
  date: '星期三',
  run: 1436,
  time: 410
}, {
  date: '星期四',
  run: 1540,
  time: 408
}, {
  date: '星期五',
  run: 1479,
  time: 396
}, {
  date: '星期六',
  run: 1530,
  time: 423
}, {
  date: '星期日',
  run: 1480,
  time: 404
}]

export const requestLineData = () => {
  return time.lazy(1200).then(_ => {
    return mockLineData.map(item => {
      const { run, time } = item
      return {
        ...item,
        speed: Math.round(time * 1000 / run)
      }
    })
  })
}

const mockMapData = [
  { area: '台湾', value1: 6295, value2: 9787, value3: 2807 },
  { area: '河北', value1: 9225, value2: 9190, value3: 1622 },
  { area: '山西', value1: 9608, value2: 9497, value3: 2861 },
  { area: '内蒙古', value1: 5054, value2: 9162, value3: 6014 },
  { area: '辽宁', value1: 2419, value2: 8703, value3: 9444 },
  { area: '吉林', value1: 4705, value2: 1863, value3: 2309 },
  { area: '黑龙江', value1: 3555, value2: 4282, value3: 3654 },
  { area: '江苏', value1: 4119, value2: 6273, value3: 6233 },
  { area: '浙江', value1: 8330, value2: 9905, value3: 212 },
  { area: '安徽', value1: 2558, value2: 7561, value3: 5824 },
  { area: '福建', value1: 3023, value2: 1519, value3: 7069 },
  { area: '江西', value1: 2937, value2: 7819, value3: 7162 },
  { area: '山东', value1: 8122, value2: 4081, value3: 6447 },
  { area: '河南', value1: 282, value2: 4363, value3: 3285 },
  { area: '湖北', value1: 3288, value2: 9559, value3: 3392 },
  { area: '湖南', value1: 9053, value2: 7034, value3: 4341 },
  { area: '广东', value1: 575, value2: 6790, value3: 5825 },
  { area: '广西', value1: 3016, value2: 8680, value3: 5499 },
  { area: '海南', value1: 4584, value2: 1490, value3: 8509 },
  { area: '四川', value1: 168, value2: 1383, value3: 8127 },
  { area: '贵州', value1: 1289, value2: 1152, value3: 7300 },
  { area: '云南', value1: 5653, value2: 7665, value3: 6439 },
  { area: '西藏', value1: 590, value2: 5167, value3: 4876 },
  { area: '陕西', value1: 6218, value2: 7417, value3: 9977 },
  { area: '甘肃', value1: 8144, value2: 7543, value3: 8902 },
  { area: '青海', value1: 8690, value2: 8520, value3: 5966 },
  { area: '宁夏', value1: 6772, value2: 6499, value3: 1895 },
  { area: '新疆', value1: 5065, value2: 8294, value3: 301 },
  { area: '北京', value1: 9469, value2: 3318, value3: 8900 },
  { area: '天津', value1: 2091, value2: 5348, value3: 5169 },
  { area: '上海', value1: 6679, value2: 4248, value3: 10057 },
  { area: '重庆', value1: 680, value2: 8295, value3: 6552 },
  { area: '香港', value1: 9713, value2: 584, value3: 613 },
  { area: '澳门', value1: 846, value2: 7431, value3: 1393 },
  { area: '南海诸岛', value1: 7545, value2: 6086, value3: 8195 }
]

export const requestMapData = () => {
  return time.lazy(1200).then(_ => {
    return mockMapData.map(item => {
      const { value1, value2, value3 } = item
      return {
        ...item,
        total: value1 + value2 + value3
      }
    })
  })
}
