import { View } from './interface'
import Table from '@/component/Table'

const CompTable: FC<View.CompTableProps> = (props) => {
  const { data } = props

  const columns = useMemo(() => {
    const size = data.reduce((res, item) => Math.max(res, item.length), 0)
    const columns: Table.ColumnsInterface = []
    for (let i = 0; i < size; i++) {
      columns.push({
        dataIndex: i,
        title: `第${i + 1}列`
      })
    }
    return columns
  }, [data])

  const currentData = useMemo(() => {
    const time = Date.now()
    return data.map((t, index) => {
      return {
        key: `${time}_${index}`,
        ...t
      }
    })
  }, [data])

  return <Table.VirtualScroll columns={columns} dataSource={currentData} />
}

export default CompTable
