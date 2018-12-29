import InternalLayout from './Layout'
import { LayoutProps } from './interface'

declare namespace Layout {
  type Props = LayoutProps
}

declare const Layout: typeof InternalLayout

export default Layout
