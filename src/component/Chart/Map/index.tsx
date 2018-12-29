/**
 * @module Map
 */
import { MapProps, OptionInterface } from '../interface'
import echarts from 'echarts/lib/echarts'
import 'echarts/map/js/china'
import Chart from '../Chart'
import { getColor, getMin, getMax } from '../config'

const ChartMap: FC<MapProps> = (props) => {
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
    if (data instanceof Array) {
      return data
    }
    return []
  }, [data, xKey, yKey])

  useEffect(() => {
    setYKey(currentConfig.slice(0, 1).map(t => t.value as string))
  }, [currentConfig])

  const option: OptionInterface = useMemo(() => {
    const mapName = 'china'
    return {
      visualMap: yKey.map((yk, ykIndex) => {
        const index = currentConfig.findIndex(t => t.value == yk)
        const color = getColor(index)
        const values = currentData.map(t => t[yk])
        const valuesInfo = {
          min: Math.min(...values),
          max: Math.max(...values)
        }
        return {
          show: true,
          min: getMin(valuesInfo),
          max: getMax(valuesInfo),
          calculable: false,
          seriesIndex: ykIndex,
          inRange: {
            color: ['#eee', color]
          }
        }
      }),
      series: yKey.map((yk) => {
        const index = currentConfig.findIndex(t => t.value == yk)
        const obj = currentConfig[index]
        const { tooltipFormatter } = obj
        return {
          type: 'map',
          map: mapName,
          label: {
            normal: {
              show: true,
              textStyle: {
                color: 'black',
                fontSize: 9
              }
            },
            emphasis: {
              show: false
            }
          },
          calculable: true,
          roam: false,
          itemStyle: {
            normal: {
              areaColor: '#eee',
              borderColor: '#3B5077'
            },
            emphasis: {
              areaColor: 'orange'
            }
          },
          tooltip: {
            formatter: typeof tooltipFormatter === 'function' ? (info: any = {}) => {
              const { name, seriesName, value, data = [] } = info
              const item = data[data.length - 1] || {}
              return tooltipFormatter({ name, key: seriesName, value }, item, info)
            } : tooltipFormatter
          }
        }
      }),
      dataset: {
        source: currentData,
        dimensions: [xKey, ...yKey]
      },
      encode: {
        x: xKey,
        y: yKey
      }
    }
  }, [xKey, yKey, currentConfig, currentData])

  const doClick = useCallback((info: any) => {
    if (typeof onClick === 'function') {
      const { name, seriesName, value, data = {} } = info
      onClick({ name, key: seriesName, value }, data, info)
    }
  }, [onClick])

  return (
    <Chart option={option}
      config={currentConfig}
      configValue={yKey}
      onChangeConfig={setYKey}
      configSize={1}
      loading={loading}
      showConfig={showConfig}
      smallConfig={smallConfig}
      height={height}
      onClick={doClick}
    />
  )
}

export default ChartMap
