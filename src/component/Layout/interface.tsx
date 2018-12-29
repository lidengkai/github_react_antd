import { RouteComponentProps } from 'react-router-dom'

// menu[]
export interface MenuItemInterface {
  /**
   * @prop {string} label 文本
   */
  label?: string
  /**
   * @prop {string} path 路由，不允许为空
   */
  path: string
  /**
   * @prop {ReactNode} icon 图标
   */
  icon?: ReactNode
  /**
   * @prop {MenuInterface} children 递归
   */
  children?: MenuItemInterface[]
}

// menu
export type MenuInterface = MenuItemInterface[]

// Header
export interface HeaderProps {
  /**
   * @prop {boolean} loading 加载中
   */
  loading?: boolean
  /**
   * @prop {string} username 用户名
   */
  username?: string
  /**
   * @prop {():void} onLogout 登出
   */
  onLogout?(): void
}

// Logo
export interface LogoProps {
}

// MiniLogo
export interface MiniLogoProps {
}

// Layout
export interface LayoutProps extends RouteComponentProps {
  /**
   * @prop {boolean} loading 加载中
   */
  loading?: boolean
  /**
   * @prop {array} menu 菜单
   * @prop {string} menu[].label 文本
   * @prop {string} menu[].path 路由，不允许为空
   * @prop {ReactNode} menu[].icon 图标
   * @prop {array} menu[].children 递归
   */
  menu: MenuInterface
  /**
   * @prop {ReactNode} header 头部组件
   */
  header?: ReactNode
  /**
   * @prop {string} username 用户名
   */
  username?: string
  /**
   * @prop {():void} 登出
   */
  onLogout?(): void
}
