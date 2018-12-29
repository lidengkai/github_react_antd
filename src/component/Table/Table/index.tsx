/**
 * @module Table
 */
import { Table as T } from 'antd'
import classnames from 'classnames'
import styles from './style.less'
import { TableColumnsInterface, TableProps } from '../interface'

const defaultRowKey = (_: any, index: number) => {
  return `${Date.now()}_${index}`
}

const Table: FC<TableProps> = (props) => {
  const {
    className,
    columns,
    rowKey = defaultRowKey,
    y,
    locale,
    scroll,
    pagination = {},
    showSorterTooltip = false,
    onChange,
    ...otherProps
  } = props

  const [currentColumns, setCurrentColumns] = useState<TableColumnsInterface<any>>([])
  const [tableWidth, setTableWidth] = useState<number | undefined>()

  const handleChange = useCallback((opts: any, filters: any, sorter: any) => {
    if (typeof onChange === 'function') {
      const { current, pageSize } = opts
      const { field, order } = sorter
      onChange({
        current,
        pageSize,
        filters,
        sort: field,
        order: order === 'descend' ? 'desc' : order === 'ascend' ? 'asc' : order
      })
    }
  }, [onChange])

  useEffect(() => {
    let tableWidth = 0
    const currentColumns: TableColumnsInterface = []
    if (columns instanceof Array) {
      for (let i = 0, l = columns.length; i < l; i++) {
        const column = columns[i]
        if (column) {
          const { width, render, align = 'center' } = column
          const currentWidth = Number(width) || 100
          tableWidth += currentWidth
          currentColumns.push({
            ...column,
            width: currentWidth,
            render: typeof render === 'function' ? (value, row, index) => {
              const result = render(value, row, index)
              return result || result === 0 ? result : '-'
            } : (value, row, index) => {
              return value || value === 0 ? value : '-'
            },
            align
          })
        }
      }
    }
    setCurrentColumns(currentColumns)
    setTableWidth(tableWidth || undefined)
  }, [columns])

  return (
    <T
      className={classnames(styles.root, className)}
      rowKey={rowKey as any}
      columns={currentColumns}
      locale={{
        filterConfirm: '确定',
        filterReset: '重置',
        emptyText: '暂无数据'
      }}
      scroll={{ x: tableWidth, y }}
      pagination={pagination === false ? false : {
        showSizeChanger: true,
        pageSizeOptions: ['20', '50', '100'],
        showTotal: (total, range) => {
          const [start, end] = range
          return `第${start}-${end}条/总共${total}条`
        },
        ...pagination
      }}
      showSorterTooltip={showSorterTooltip}
      onChange={handleChange}
      {...otherProps}
    />
  )
}

export default Table
