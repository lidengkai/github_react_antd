import { MenuInterface, ConfigInterface, RouteInterface } from './interface'

const inInfo = (info: any, role: string) => {
  const currentRole = String(role)
  if (info) {
    const { role } = info
    if (role instanceof Array) {
      if (role.indexOf(currentRole) < 0) {
        return false
      }
    } else {
      return false
    }
  }
  return true
}

export const getMenu = (config: ConfigInterface, role: string): MenuInterface => {
  const fn = (config: ConfigInterface | undefined): MenuInterface => {
    const arr: MenuInterface = []
    if (config instanceof Array) {
      for (const item of config) {
        const { label, path, icon, children, redirect, hideInMenu, ...info } = item
        if (!redirect && !hideInMenu && inInfo(info, role)) {
          arr.push({
            label,
            path,
            icon,
            children: fn(children)
          })
        }
      }
    }
    return arr
  }
  return fn(config)
}

export const getRoute = (config: ConfigInterface, role: string): RouteInterface => {
  const arr: RouteInterface = []
  const fn = (config: ConfigInterface | undefined, parentPath: string = '') => {
    if (config instanceof Array) {
      for (const item of config) {
        const { path, children, redirect, exact = true, component, ...info } = item
        const currentPath = parentPath + path
        if (inInfo(info, role)) {
          arr.push({
            path: currentPath,
            redirect,
            exact,
            component
          })
        }
        fn(children, currentPath)
      }
    }
  }
  fn(config)
  return arr
}
