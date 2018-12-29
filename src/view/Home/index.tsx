/**
 * @module Home
 */
import { connect } from 'react-redux'
import { NAME } from './flow/constant'
import * as action from './flow/action'
import styles from './style.less'
import { StateInterface, View } from './interface'
import { Breadcrumb, Card, Row, Col } from 'antd'

const Home: FC<View.Props> = () => {
  useEffect(() => {
    action.initPage()
  }, [])

  const config = useMemo(() => [
    { name: '示例代码', data: 'src/view/Home' },
    { name: '修改redux', data: 'src/view/Home/flow/constant.tsx' },
    { name: '配置redux', data: 'src/store/reducers.tsx' },
    { name: '配置路由/菜单', data: 'src/layout/Page/config.tsx' },
    { name: '其他说明', data: 'constant的NAME值与reducers的命名保持一致' }
  ], [])

  return (
    <>
      <Breadcrumb className={styles.breadcrumb}>
        <Breadcrumb.Item>首页</Breadcrumb.Item>
      </Breadcrumb>
      <Card className={styles.card}>
        {
          config.map((item, key) => (
            <Row key={key} gutter={8} className={styles.line}>
              <Col span={8} className={styles.left}>{item.name}:</Col>
              <Col span={16} className={styles.right}>{item.data}</Col>
            </Row>
          ))
        }
      </Card>
    </>
  )
}

const mapStateToProps = (state: any) => {
  const data: StateInterface = state[NAME]
  return {
  }
}

export default connect(mapStateToProps)(Home)
