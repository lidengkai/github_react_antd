/**
 * @module Table.VirtualScroll 虚拟滚动表格
 */
import classnames from 'classnames'
import Table from '../Table'
import styles from './style.less'
import { VirtualScrollProps, TableColumnsInterface } from '../interface'

const ANTD_TBODY_CLASS = 'ant-table-body'

const VirtualScroll: FC<VirtualScrollProps> = (props) => {
  const {
    y = '60vh',
    pagination,
    dataSource,
    columns,
    rowHeight = 47,
    ...otherProps
  } = props

  const [heightClassName, setHeightClassName] = useState<string>()
  const [topClassName, setTopClassName] = useState<string>()
  const [heightCss, setHeightCss] = useState<string>('')
  const [topCss, setTopCss] = useState<string>('')
  const [currentColumns, setCurrentColumns] = useState<any[]>([])
  const [currentDataSource, setCurrentDataSource] = useState<any[]>([])
  const [scrollTop, setScrollTop] = useState<number>(0)
  const [clientHeight, setClientHeight] = useState<number>(0)

  const allDataSource = useMemo(() => {
    if (dataSource instanceof Array) {
      return dataSource
    }
    return []
  }, [dataSource])

  const heightList = useMemo(() => {
    const heightList = []
    if (typeof rowHeight === 'function') {
      for (let index = 0, l = allDataSource.length; index < l; index++) {
        heightList.push(Number(rowHeight(allDataSource[index], index)) || 0)
      }
    } else {
      for (let index = 0, l = allDataSource.length; index < l; index++) {
        heightList.push(Number(rowHeight) || 0)
      }
    }
    return heightList
  }, [allDataSource, rowHeight])

  const readHeightDiv = useMemo(() => {
    const div = document.createElement('div')
    div.className = styles.readHeight
    document.body.appendChild(div)
    return div
  }, [])

  useEffect(() => {
    readHeightDiv.style.height = typeof y === 'number' ? y + 'px' : y
    setClientHeight(readHeightDiv.clientHeight)
  }, [y])

  useEffect(() => {
    const listener = () => {
      setClientHeight(readHeightDiv.clientHeight)
    }
    window.addEventListener('resize', listener, false)
    return () => {
      window.removeEventListener('resize', listener, false)
      document.body.removeChild(readHeightDiv)
    }
  }, [])

  const handlScroll = useCallback((e) => {
    const target = e.target as HTMLDivElement
    if (target.classList.contains(ANTD_TBODY_CLASS)) {
      const { scrollTop } = target
      setScrollTop(scrollTop)
    }
  }, [])

  useEffect(() => {
    const size = heightList.length
    let start = 0
    let end = size
    let top = 0
    for (let index = 0; index < size; index++) {
      if (top > scrollTop - 200) {
        start = index
        break
      }
      top += heightList[index]
    }
    let height = 0
    for (let index = 0; index < size; index++) {
      height += heightList[index]
      if (height > clientHeight + scrollTop + 200) {
        end = index + 1
        break
      }
    }
    height = 0
    for (let index = 0; index < size; index++) {
      height += heightList[index]
    }
    const currentColumns: TableColumnsInterface = []
    if (columns instanceof Array) {
      for (const column of columns) {
        if (column) {
          const item = { ...column }
          const { render } = item
          if (typeof render === 'function') {
            item.render = (value, row, i) => {
              return render(value, row, start + i)
            }
          }
          currentColumns.push(item)
        }
      }
    }
    const currentDataSource = allDataSource.slice(start, end)
    const heightClassName = `${styles.height}-${height}`
    const heightCss = `.${styles.root}.${heightClassName} .${ANTD_TBODY_CLASS}::after{height: ${height}px;}`
    const topClassName = `${styles.top}-${top}`
    const topCss = `.${styles.root}.${topClassName} .${ANTD_TBODY_CLASS}>table{top: ${top}px;}`
    setCurrentColumns(currentColumns)
    setCurrentDataSource(currentDataSource)
    setHeightClassName(heightClassName)
    setHeightCss(heightCss)
    setTopClassName(topClassName)
    setTopCss(topCss)
  }, [scrollTop, heightList, clientHeight, columns, allDataSource])

  return (
    <div className={classnames(styles.root, heightClassName, topClassName)} onScrollCapture={handlScroll}>
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
