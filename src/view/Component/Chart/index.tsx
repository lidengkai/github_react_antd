/**
 * @module ComponentChart
 */
import { connect } from 'react-redux'
import { NAME } from './flow/constant'
import * as action from './flow/action'
import styles from './style.less'
import { StateInterface, View } from './interface'
import { Breadcrumb, Card, Row, Col } from 'antd'
import Chart from '@/component/Chart'
import { ChartConfigInterface } from '@/component/Chart/interface'
import moment from 'moment'

const ComponentChart: FC<View.Props> = (props) => {
  const {
    lineLoading,
    lineData,
    mapLoading,
    mapData,
    pieData
  } = props

  const changeTime = useCallback((time) => {
    return moment(time * 1000).format(`mm'ss"`)
  }, [])

  const lineConfig = useMemo((): ChartConfigInterface => {
    return [
      {
        value: 'run',
        title: '距离',
        type: 'bar',
        name: '距离(米)'
      },
      {
        value: 'time',
        title: '时间',
        type: 'bar',
        axisLabelFormatter: (value) => {
          return changeTime(value)
        },
        tooltipFormatter: (info) => {
          return `${info.name}: ${changeTime(info.value)}`
        }
      },
      {
        value: 'speed',
        title: '配速',
        name: '配速/千米',
        axisLabelFormatter: (value) => {
          return changeTime(value)
        },
        tooltipFormatter: (info) => {
          return `${info.name}: ${changeTime(info.value)}/千米`
        }
      }
    ]
  }, [])

  const mapConfig = useMemo(() => {
    return [
      {
        value: 'value1',
        title: '值1'
      },
      {
        value: 'value2',
        title: '值2'
      },
      {
        value: 'value3',
        title: '值3'
      },
      {
        value: 'total',
        title: '总和'
      }
    ]
  }, [])

  const pieConfig = useMemo(() => {
    return [
      {
        value: 'value1',
        title: '值1'
      },
      {
        value: 'value2',
        title: '值2'
      },
      {
        value: 'value3',
        title: '值3'
      }
    ]
  }, [])

  useEffect(() => {
    action.initPage()
  }, [])

  return (
    <>
      <Breadcrumb className={styles.breadcrumb}>
        <Breadcrumb.Item>组件</Breadcrumb.Item>
        <Breadcrumb.Item>图表</Breadcrumb.Item>
      </Breadcrumb>
      <Card className={styles.card} title="Chart.Line">
        <Chart.Line xKey="date"
          loading={lineLoading}
          data={lineData}
          config={lineConfig}
        />
      </Card>
      <Row>
        <Col span={24} xl={16}>
          <Card className={styles.card} title="Chart.Map">
            <Chart.Map xKey="area"
              loading={mapLoading}
              data={mapData}
              config={mapConfig}
              onClick={action.clickMap}
            />
          </Card>
        </Col>
        <Col span={24} xl={8}>
          <Card className={styles.card} title="Chart.Pie">
            <Chart.Pie
              data={pieData}
              config={pieConfig}
            />
          </Card>
        </Col>
      </Row>
    </>
  )
}

const mapStateToProps = (state: any) => {
  const data: StateInterface = state[NAME]
  return {
    lineLoading: data.lineLoading,
    lineData: data.lineData,
    mapLoading: data.mapLoading,
    mapData: data.mapData,
    pieData: data.pieData
  }
}

export default connect(mapStateToProps)(ComponentChart)
