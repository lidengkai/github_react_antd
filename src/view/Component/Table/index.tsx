/**
 * @module ComponentTable
 */
import { connect } from 'react-redux'
import { NAME } from './flow/constant'
import * as action from './flow/action'
import styles from './style.less'
import { StateInterface, View } from './interface'
import { Breadcrumb, Card, Input, Button } from 'antd'
import { PlusOutlined, PauseCircleOutlined, PlayCircleOutlined } from '@ant-design/icons'
import Table from '@/component/Table'
import ModalInfo from './ModalInfo'

const ComponentTable: FC<View.Props> = (props) => {
  const { loading, current, pageSize, total, dataSource } = props

  const columns = useMemo((): Table.ColumnsInterface => [
    {
      dataIndex: 'id',
      title: 'ID',
      fixed: 'left'
    }, {
      dataIndex: 'name',
      title: '名称'
    }, {
      dataIndex: 'status',
      title: '状态',
      filters: [
        { text: '启动', value: '1' },
        { text: '暂停', value: '0' }
      ],
      filterMultiple: false,
      render: (value: any, row: any) => {
        return value == '1' ?
          <>
            <Table.Link>启动</Table.Link>
            <Table.Link row={row} onClick={action.handlePause}>
              <a><PauseCircleOutlined /></a>
            </Table.Link>
          </> : value == '0' ?
            <>
              <Table.Link>暂停</Table.Link>
              <Table.Link row={row} onClick={action.handleStart}>
                <a><PlayCircleOutlined /></a>
              </Table.Link>
            </> : ''
      }
    }, {
      dataIndex: 'value',
      title: '值',
      sorter: true
    }, {
      key: 'operate',
      dataIndex: 'id',
      title: '操作',
      fixed: 'right',
      width: 150,
      render: (value: any) => {
        return (
          <>
            <Table.Link value={value} onClick={action.openInfo}><a>查看</a></Table.Link>
            <Table.Link>|</Table.Link>
            <Table.Link value={value} onClick={action.openEdit}><a>编辑</a></Table.Link>
            <Table.Link>|</Table.Link>
            <Table.Link comfirm="删除后不可恢复，确定要删除吗?" value={value} onClick={action.delInfo}><a>删除</a></Table.Link>
          </>
        )
      }
    }
  ], [])

  useEffect(() => {
    action.initPage()
  }, [])

  return (
    <>
      <Breadcrumb className={styles.breadcrumb}>
        <Breadcrumb.Item>组件</Breadcrumb.Item>
        <Breadcrumb.Item>表格</Breadcrumb.Item>
      </Breadcrumb>
      <Card className={styles.card}>
        <div className={styles.line}>
          <Input.Search className={styles.search}
            placeholder="名称"
            enterButton
            onSearch={action.handleSearch}
          />
        </div>
        <div className={styles.line}>
          <Button type="primary" onClick={action.openAdd}><PlusOutlined />添加</Button>
        </div>
        <Table y="75vh" rowKey="id"
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          pagination={{
            total,
            current,
            pageSize
          }}
          onChange={action.changeTable}
        />
      </Card>
      <Card className={styles.card}>
        表格虚拟滚动：<a onClick={action.toUploadCsv}>Table.VirtualScroll</a>
      </Card>
      <ModalInfo />
    </>
  )
}

const mapStateToProps = (state: any) => {
  const data: StateInterface = state[NAME] || {}
  return {
    loading: data.loading,
    current: data.current,
    pageSize: data.pageSize,
    total: data.total,
    dataSource: data.dataSource
  }
}

export default connect(mapStateToProps)(ComponentTable)
