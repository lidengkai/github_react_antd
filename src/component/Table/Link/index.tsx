/**
 * @module Table.Link
 */
import { Popconfirm } from 'antd'
import styles from './style.less'
import { LinkProps } from '../interface'

const Link: FC<LinkProps> = (props) => {
  const { value, row, onClick, comfirm, children } = props

  const handleClick = useCallback(() => {
    if (typeof onClick === 'function') {
      onClick(value, row)
    }
  }, [onClick, value, row])

  return (
    comfirm ? <Popconfirm title={comfirm} onConfirm={handleClick}>
      <span className={styles.link}>{children}</span>
    </Popconfirm> :
      <span className={styles.link} onClick={handleClick}>{children}</span>
  )
}

export default Link
