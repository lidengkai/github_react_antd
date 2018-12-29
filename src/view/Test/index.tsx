/**
 * @module Test
 */
import { connect } from 'react-redux'
import { NAME } from './flow/constant'
import * as action from './flow/action'
import styles from './style.less'
import { StateInterface, View } from './interface'
import { Breadcrumb, Card, Alert } from 'antd'

const Test: FC<View.Props> = () => {
  useEffect(() => {
    action.initPage()
  }, [])

  return (
    <>
      <Alert showIcon type="info" message="仅Test(role=2)可见" />
      <Breadcrumb className={styles.breadcrumb}>
        <Breadcrumb.Item>测试</Breadcrumb.Item>
      </Breadcrumb>
      <Card className={styles.card}>
        <div className={styles.text}>权限测试，仅test用户可访问</div>
      </Card>
    </>
  )
}

const mapStateToProps = (state: any) => {
  const data: StateInterface = state[NAME]
  return {
  }
}

export default connect(mapStateToProps)(Test)
