/**
 * @module Chart
 */
import styles from './style.less'
import { ChartProps, OptionInterface } from '../interface'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/component/tooltip'
import { Radio } from 'antd'
import { Loading3QuartersOutlined } from '@ant-design/icons'
import { getColor, lazyDone } from '../config'

const Chart: FC<ChartProps> = (props) => {
  const {
    config,
    configValue,
    showConfig = true,
    onChangeConfig,
    smallConfig,
    configSize,
    loading,
    option,
    height,
    onClick
  } = props

  const [width, setWidth] = useState<number>(0)
  const rootRef = useRef<any>(null)
  const mainRef = useRef<any>(null)

  const currentValue = useMemo(() => {
    return configValue instanceof Array ? configValue : []
  }, [configValue])

  const currentHeight = useMemo(() => {
    return Number(height) || 360
  }, [height])

  const currentSize = useMemo(() => {
    if (config instanceof Array) {
      return Number(configSize) || config.length
    }
    return 2
  }, [configSize, config])

  const change = useCallback((key: string) => {
    const value = [...currentValue]
    const index = value.indexOf(key)
    if (index > -1) {
      if (value.length > 1) {
        value.splice(index, 1)
      } else {
        return
      }
    } else {
      value.push(key)
      value.length > currentSize && value.shift()
    }
    typeof onChangeConfig === 'function' && onChangeConfig(value)
  }, [onChangeConfig, currentValue, currentSize])

  const buttonNodes = useMemo(() => {
    const nodes = []
    if (config instanceof Array) {
      for (let index = 0, l = config.length; index < l; index++) {
        const { value, title } = config[index] || {}
        const style: CSSProperties = currentValue.indexOf(value as string) > -1 ? {
          backgroundColor: getColor(index),
          color: '#FFFFFF',
          fontWeight: 'bold'
        } : {}
        nodes.push(
          <Radio.Button key={value}
            style={style}
            onClick={() => change(value as string)}
          >{title}</Radio.Button>
        )
      }
    }
    return nodes
  }, [config, currentValue])

  const draw = useCallback((option?: OptionInterface, onClick?: (info: any) => void) => {
    echarts.dispose(mainRef.current)
    if (option) {
      const myChart = echarts.init(mainRef.current)
      const { title = {}, grid = {}, tooltip = {}, ...otherOption } = option as any
      myChart.setOption({
        backgroundColor: 'white',
        title: {
          textStyle: {
            color: 'rgb(55, 75, 113)',
            fontFamily: '等线',
            fontSize: 16
          },
          subtextStyle: {
            fontSize: 14,
            fontFamily: '等线'
          },
          ...title
        },
        grid: {
          top: 6,
          left: 6,
          right: 6,
          bottom: 6,
          containLabel: true,
          ...grid
        },
        tooltip: {
          show: true,
          ...tooltip
        },
        ...otherOption
      })
      if (typeof onClick === 'function') {
        myChart.on('click', function (info: any) {
          onClick(info)
        })
      }
    }
  }, [])

  const changeSize = useCallback(() => {
    const { current } = rootRef
    if (current) {
      const { width } = current.getBoundingClientRect()
      setWidth(width)
    }
  }, [])

  useEffect(() => {
    draw(option, onClick)
  }, [width, currentHeight, option, onClick])

  useEffect(() => {
    const lazyChangeKey = lazyDone(changeSize, 300)
    window.addEventListener('resize', lazyChangeKey, false)
    return () => {
      window.removeEventListener('resize', lazyChangeKey, false)
    }
  }, [])

  return (
    <div className={styles.root}>
      <div className={styles.line}>
        {showConfig && buttonNodes.length ? <div className={styles.buttons}>
          <Radio.Group size={smallConfig ? 'small' : undefined}>{buttonNodes}</Radio.Group>
        </div> : null}
      </div>
      <div ref={rootRef}>
        <div ref={mainRef} style={{ height: currentHeight }}></div>
      </div>
      {loading ? <div className={styles.loading}>
        <div className={styles.center}>
          <Loading3QuartersOutlined spin />
        </div>
      </div> : null}
    </div>
  )
}

export default Chart
