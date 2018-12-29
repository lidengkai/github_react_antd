/**
 * @module Table.VirtualScroll 虚拟滚动表格
 */
import classnames from 'classnames'
import Table from '../Table'
import styles from './style.less'
import { VirtualScrollProps, TableColumnsInterface } from '../interface'

const ANTD_TBODY_CLASS = 'ant-table-body'
const LINE_HEIGHT = 48

const VirtualScroll: FC<VirtualScrollProps> = (props) => {
  const {
    y = '60vh',
    pagination,
    dataSource,
    columns,
    dataSize = 20,
    ...otherProps
  } = props

  const [heightClassName, setHeightClassName] = useState<string>()
  const [topClassName, setTopClassName] = useState<string>()
  const [heightCss, setHeightCss] = useState<string>('')
  const [topCss, setTopCss] = useState<string>('')
  const [index, setIndex] = useState<number>(0)
  const [renderedTime, setRenderedTime] = useState<number>(-1)
  const [currentDataSource, setCurrentDataSource] = useState<any[]>([])

  const ref = useRef<HTMLDivElement>(null)

  const currentColumns = useMemo(() => {
    const currentColumns: TableColumnsInterface = []
    if (columns instanceof Array) {
      for (const column of columns) {
        if (column) {
          const item = { ...column }
          const { render } = item
          if (typeof render === 'function') {
            item.render = (value, row, i) => {
              return render(value, row, index + i)
            }
          }
          currentColumns.push(item)
        }
      }
    }
    return currentColumns
  }, [index, columns])

  const allDataSource = useMemo(() => {
    if (dataSource instanceof Array) {
      return dataSource
    }
    return []
  }, [dataSource])

  const currentDataSize = useMemo(() => {
    return Number(dataSize) || 20
  }, [dataSize])

  useEffect(() => {
    const { current } = ref
    if (current) {
      current.addEventListener('scroll', (e) => {
        const target = e.target as HTMLDivElement
        if (target.classList.contains(ANTD_TBODY_CLASS)) {
          const { scrollTop } = target
          const index = Math.max(Math.round(scrollTop / LINE_HEIGHT) - 5, 0)
          setIndex(index)
        }
      }, true)
    }
  }, [])

  useEffect(() => {
    const { length } = allDataSource
    const currentDataSource = allDataSource.slice(index, index + currentDataSize)
    const height = length * LINE_HEIGHT
    const heightClassName = `${styles.height}-${height}`
    const heightCss = `.${styles.root}.${heightClassName} .${ANTD_TBODY_CLASS}::after{height: ${height}px;}`
    const top = index * LINE_HEIGHT
    const topClassName = `${styles.top}-${top}`
    const topCss = `.${styles.root}.${topClassName} .${ANTD_TBODY_CLASS}>table{top: ${top}px;}`
    setHeightClassName(heightClassName)
    setHeightCss(heightCss)
    setTopClassName(topClassName)
    setTopCss(topCss)
    setCurrentDataSource(currentDataSource)
    setRenderedTime(Date.now())
  }, [allDataSource, index, currentDataSize])

  useEffect(() => {
    const { length } = allDataSource
    if (renderedTime < 0) {
      return
    }
    if (index < Math.max(length - currentDataSize, 0)) {
      return
    }
    const { current } = ref
    if (!current) {
      return
    }
    const container = current.getElementsByClassName(ANTD_TBODY_CLASS)[0]
    if (!container) {
      return
    }
    const table = container.firstElementChild
    if (!table) {
      return
    }
    if (length <= currentDataSize) {
      const height = table.clientHeight
      const heightClassName = `${styles.height}-${height}`
      const heightCss = `.${styles.root}.${heightClassName} .${ANTD_TBODY_CLASS}::after{height: ${height}px;}`
      setHeightClassName(heightClassName)
      setHeightCss(heightCss)
    } else {
      const top = container.scrollHeight - table.clientHeight
      const topClassName = `${styles.top}-${top}`
      const topCss = `.${styles.root}.${topClassName} .${ANTD_TBODY_CLASS}>table{top: ${top}px;}`
      setTopClassName(topClassName)
      setTopCss(topCss)
    }
  }, [renderedTime])

  return (
    <div className={classnames(styles.root, heightClassName, topClassName)} ref={ref}>
      <style>{heightCss}{topCss}</style>
      <Table y={y}
        pagination={false}
        dataSource={currentDataSource}
        columns={currentColumns}
        {...otherProps}
      />
    </div>
  )
}

export default VirtualScroll
