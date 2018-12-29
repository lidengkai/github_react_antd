import { getColorInterface } from './interface'

// 配色
export const colorList = [
  [0, 153, 255],
  [242, 99, 120],
  [19, 219, 173],
  [155, 125, 72],
  [60, 115, 0],
  [0, 146, 199],
  [250, 218, 141],
  [182, 194, 154],
  [220, 87, 18],
  [29, 191, 151]
]

export const getColor: getColorInterface = (index, isLight) => {
  const { length } = colorList
  const [r, g, b] = colorList[index % length]
  if (isLight) {
    return `rgba(${r}, ${g}, ${b}, 0.6)`
  }
  return `rgb(${r}, ${g}, ${b})`
}

export const lazyDone = (callback: Function, time?: number) => {
  const timeout = Number(time) || 1200
  let timer = 0
  return () => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(callback, timeout)
  }
}

export const getDelta = (info: any, type?: 'min' | 'max') => {
  const min = Number(info.min)
  const max = Number(info.max)
  const delta = (max - min) / 5
  const base = 10 ** Math.floor(Math.log10(delta))
  const round = Math.max(Math.round(delta / base) * base, 10)
  switch (type) {
    case 'min': {
      const minValue = min - (min % round)
      return isNaN(minValue) ? 0 : minValue
    }
    case 'max': {
      const maxValue = max + (round - max % round)
      return isNaN(maxValue) ? 10 : maxValue
    }
    default: {
      return 0
    }
  }
}

export const getMin = (info: any) => {
  return getDelta(info, 'min')
}

export const getMax = (info: any) => {
  return getDelta(info, 'max')
}
