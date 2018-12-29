/**
 * @module Pie
 */
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import Chart from '../Chart'
import { PieProps, OptionInterface } from '../interface'
import { getColor } from '../config'

const ChartPie: FC<PieProps> = (props) => {
  const {
    config,
    data,
    loading,
    showConfig,
    smallConfig,
    height,
    onClick,
    tooltipFormatter
  } = props

  const [yKey, setYKey] = useState<string[]>([])

  const currentConfig = useMemo(() => {
    if (config instanceof Array) {
      return config
    }
    return []
  }, [config])

  const currentData = useMemo(() => {
    const currentData: any[] = []
    if (data) {
      for (const yk of yKey) {
        const index = currentConfig.findIndex(t => t.value == yk)
        const color = getColor(index)
        const value = data[yk]
        currentData.push({ name: yk, value, itemStyle: { color } })
      }
    }
    return currentData
  }, [data, yKey])

  useEffect(() => {
    setYKey(currentConfig.map(t => t.value as string))
  }, [currentConfig])

  const option: OptionInterface = useMemo(() => {
    return {
      series: [
        {
          type: 'pie',
          minAngle: 10,
          label: {
            show: false
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          tooltip: typeof tooltipFormatter === 'function' ? (info: any = {}) => {
            const { name, data = {} } = info
            const { value } = data
            return tooltipFormatter({ name, key: name, value }, { [name]: value }, info)
          } : tooltipFormatter
        }
      ],
      dataset: {
        source: currentData
      }
    }
  }, [currentData, tooltipFormatter])

  const doClick = useCallback((info: any) => {
    if (typeof onClick === 'function') {
      const { name, data = {} } = info
      const { value } = data
      onClick({ name, key: name, value }, { [name]: value }, info)
    }
  }, [onClick])

  return (
    <Chart option={option}
      config={currentConfig}
      configValue={yKey}
      onChangeConfig={setYKey}
      loading={loading}
      showConfig={showConfig}
      smallConfig={smallConfig}
      height={height}
      onClick={doClick}
    />
  )
}

export default ChartPie
