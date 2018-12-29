/**
 * @module Header 头部
 */
import styles from './style.less'
import { HeaderProps } from '../interface'
import { Dropdown, Menu, Tooltip, Spin } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'

const Header: FC<HeaderProps> = (props) => {
  const { loading, username, onLogout } = props

  return (
    <>
      <div className={styles.root}>
        <div className={styles.right}>
          <div className={styles.username}>
            <Dropdown overlay={<Menu></Menu>} trigger={[]}>
              <span>{loading ? <Spin /> : username}</span>
            </Dropdown>
          </div>
          <div className={styles.logout}>
            <Tooltip title="退出登录">
              <span className={styles.icon} onClick={onLogout}>
                <LogoutOutlined />
              </span>
            </Tooltip>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
