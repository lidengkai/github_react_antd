/**
 * @module Exception404
 */
import styles from './style.less'
import { Card } from 'antd'

export default () => {
  return (
    <>
      <Card className={styles.card}>
        <div className={styles.text}>404</div>
      </Card>
    </>
  )
}
