/**
 * @module Layout 布局
 */
import { Layout as L, Menu } from 'antd'
import { withRouter, Link } from 'react-router-dom'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { Logo, MinLogo } from '../Logo'
import Header from '../Header'
import styles from './style.less'
import { MenuInterface, LayoutProps } from '../interface'

// 创建菜单
const renderMenuNodes = (menu: MenuInterface | undefined, pathname: string = '') => {
  if (menu instanceof Array) {
    return menu.map((item) => {
      const { label = '', icon, path = '/', children } = item || {}
      const currentPath = pathname + path
      const nextNodes = renderMenuNodes(children, currentPath)
      if (nextNodes.length) {
        return (
          <Menu.SubMenu key={currentPath} title={
            <span>
              {icon || null}
              <span>{label}</span>
            </span>
          }
          >{nextNodes}</Menu.SubMenu>
        )
      }
      return (
        <Menu.Item key={currentPath}>
          <Link to={currentPath}>
            {icon || null}
            <span>{label}</span>
          </Link>
        </Menu.Item>
      )
    })
  }
  return []
}

// 获取当前菜单向上的所有父节点
const readMenuKeys = (menu: MenuInterface, key: string, containSelf?: boolean) => {
  const result: string[] = []
  const fn = (menu: MenuInterface | undefined, pathname: string = '') => {
    if (menu instanceof Array) {
      for (const item of menu) {
        const { path = '/', children } = item || {}
        const currentPath = pathname + path
        if (currentPath === key) {
          if (containSelf) {
            result.push(currentPath)
          }
          return true
        }
        result.push(currentPath)
        if (fn(children, currentPath)) {
          return true
        }
        result.pop()
      }
    }
  }
  fn(menu)
  return result
}

const Layout: FC<LayoutProps> = (props) => {
  const { loading, menu, location, children, username, onLogout } = props
  const { pathname } = location

  // 菜单隐藏
  const [collapsed, setCollapsed] = useState<boolean>(false)
  // 当前选中的子节点
  const [selectedKeys, setSelectedKeys] = useState<any>([])
  // 菜单隐藏时，展开的父节点
  const [collapsedOpenKeys, setCollapsedOpenKeys] = useState<any>([])
  // 菜单显示时，展开的父节点
  const [openKeys, setOpenKeys] = useState<any>([])

  // 菜单父节点状态
  const handleOpenChange = useCallback((keys: string[]) => {
    const old = collapsed ? collapsedOpenKeys : openKeys
    const latestOpenKey = keys.find(key => old.indexOf(key) === -1)
    if (latestOpenKey) {
      const currentOpenKeys = readMenuKeys(menu, latestOpenKey, true)
      collapsed ? setCollapsedOpenKeys(currentOpenKeys) : setOpenKeys(currentOpenKeys)
    } else {
      collapsed ? setCollapsedOpenKeys(keys) : setOpenKeys(keys)
    }
  }, [menu, collapsed, collapsedOpenKeys, openKeys])

  // 菜单子节点选中状态
  const handleSelect = useCallback((e: any) => {
    setSelectedKeys(e.selectedKeys)
  }, [])

  // 菜单状态
  const handleCollapsed = useCallback(() => {
    setCollapsed(!collapsed)
  }, [collapsed])

  // 渲染菜单
  const menuNodes = useMemo(() => renderMenuNodes(menu), [menu])

  useEffect(() => {
    const openKeys = readMenuKeys(menu, pathname)
    setOpenKeys(openKeys)
    setSelectedKeys(pathname)
  }, [menu, pathname])


  // render
  return (
    <>
      <div className={styles.root}>
        <div className={styles.left}>
          <L className={styles.label}>
            <L.Sider className={styles.sider} collapsed={collapsed}>
              <div className={styles.well}>
                <div className={styles.logo}>
                  {collapsed ? <MinLogo /> : <Logo />}
                </div>
                <Menu mode="inline" theme="dark"
                  onOpenChange={handleOpenChange}
                  onSelect={handleSelect}
                  openKeys={collapsed ? collapsedOpenKeys : openKeys}
                  selectedKeys={selectedKeys}
                >{menuNodes}</Menu>
              </div>
              <div className={styles.tool} onClick={handleCollapsed}>
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              </div>
            </L.Sider>
          </L>
        </div>
        <div className={styles.container}>
          <div className={styles.right}>
            <L className={styles.layout}>
              <div className={styles.header}>
                <Header loading={loading} username={username} onLogout={onLogout} />
              </div>
              <L.Content className={styles.content}>
                <div>
                  {children}
                </div>
                <div className={styles.hold}></div>
              </L.Content>
              <L.Footer className={styles.footer}>&copy;lidengkai</L.Footer>
            </L>
          </div>
        </div>
      </div>
    </>
  )
}

export default withRouter(Layout)
