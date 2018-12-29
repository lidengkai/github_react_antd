/**
 * @module Line
 */
import { LineProps, OptionInterface } from '../interface'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import Chart from '../Chart'
import { getColor, getMin, getMax } from '../config'

const ChartLine: FC<LineProps> = (props) => {
  const {
    xKey = 'name',
    config,
    data,
    loading,
    showConfig,
    smallConfig,
    height,
    onClick
  } = props

  const [yKey, setYKey] = useState<string[]>([])

  const currentConfig = useMemo(() => {
    if (config instanceof Array) {
      return config
    }
    return []
  }, [config])

  const currentData = useMemo(() => {
    if (data instanceof Array && data.length) {
      return data
    }
    const nullInfo: any = { [xKey]: '暂无数据' }
    for (const ky of yKey) {
      nullInfo[ky] = 0
    }
    return [nullInfo]
  }, [data, xKey, yKey])

  useEffect(() => {
    setYKey(currentConfig.slice(0, 2).map(t => t.value as string))
  }, [currentConfig])

  const option: OptionInterface = useMemo(() => {
    if (!yKey.length) {
      return null
    }
    return {
      grid: {
        top: 42
      },
      tooltip: {
        trigger: 'item'
      },
      xAxis: [
        {
          type: 'category',
          axisLine: {
            show: true,
            lineStyle: {
              color: '#063374',
              width: 1,
              type: 'solid'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: true,
            color: '#00c7ff',
            fontSize: 14
          }
        }
      ],
      yAxis: yKey.map((yk) => {
        const index = currentConfig.findIndex(t => t.value == yk)
        const color = getColor(index)
        const obj = currentConfig[index]
        const { title, name, axisLabelFormatter } = obj
        return {
          type: 'value',
          name: name !== undefined ? name : title,
          min: (info: any) => {
            return getMin(info)
          },
          max: (info: any) => {
            return getMax(info)
          },
          nameTextStyle: {
            color,
            fontSize: 14,
            padding: [6, 0]
          },
          axisLabel: {
            color,
            fontSize: 14,
            formatter: axisLabelFormatter
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: '#eee'
            }
          }
        }
      }),
      series: yKey.map((yk, ykIndex) => {
        const index = currentConfig.findIndex(t => t.value == yk)
        const color = getColor(index)
        const obj = currentConfig[index]
        const { type, tooltipFormatter } = obj
        return {
          type: type === 'bar' ? 'bar' : 'line',
          yAxisIndex: ykIndex,
          itemStyle: {
            normal: {
              color: type === 'bar' ? new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: getColor(index, true)
                }, {
                  offset: 1,
                  color
                }
              ]) : color,
              opacity: 1
            }
          },
          tooltip: {
            formatter: typeof tooltipFormatter === 'function' ? (info: any = {}) => {
              const { name, data = {} } = info
              return tooltipFormatter({ name, key: yk, value: data[yk] }, data, info)
            } : tooltipFormatter
          },
          encode: {
            x: xKey,
            y: yk
          }
        }
      }),
      dataset: {
        source: data,
        dimensions: [xKey, ...yKey]
      }
    }
  }, [xKey, yKey, currentConfig, currentData])

  const doClick = useCallback((info: any) => {
    if (typeof onClick === 'function') {
      const { name, seriesIndex, data = {} } = info
      const key = yKey[seriesIndex]
      onClick({ name, key, value: data[key] }, data, info)
    }
  }, [onClick, yKey])

  return (
    <Chart option={option}
      config={currentConfig}
      configValue={yKey}
      onChangeConfig={setYKey}
      configSize={2}
      loading={loading}
      showConfig={showConfig}
      smallConfig={smallConfig}
      height={height}
      onClick={doClick}
    />
  )
}

export default ChartLine
