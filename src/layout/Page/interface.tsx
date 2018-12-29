import { RouteComponentProps } from 'react-router-dom'
import { MenuInterface } from '@/component/Layout/interface'
// store
import { AppStateInterface } from '@/config'

// view
export namespace View {
  export interface Props extends AppStateInterface, RouteComponentProps {
  }
}

// ajax
export namespace Ajax {
  // info
  export namespace Info {
    export interface Request {
    }

    export interface Response extends AppStateInterface {
    }
  }

  // logout
  export namespace Logout {
    export interface Request {
    }

    export interface Response {
    }
  }
}

// data
export { MenuInterface }

export interface ConfigItemInterface {
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
   * @prop {boolean} exact 路由全匹配
   * @default true
   */
  exact?: boolean
  /**
   * @prop {string} redirect 重定向
   */
  redirect?: string
  /**
   * @prop {ComponentClass} component 组件
   */
  component?: React.ComponentClass | null
  /**
   * @prop {MenuInterface} children 递归
   */
  children?: ConfigItemInterface[]
  /**
   * @prop {boolean} hideInMenu 不在左侧菜单显示
   */
  hideInMenu?: boolean
  /**
   * @prop {any} [x] 其他信息
   */
  [x: string]: any
}

export type ConfigInterface = ConfigItemInterface[]

export interface RouteItemInterface {
  path: string
  exact?: boolean
  redirect?: string
  component?: React.ComponentClass | null
}

export type RouteInterface = RouteItemInterface[]
