import { Switch, Route, Redirect, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import { APP_STORE, AppStateInterface } from '@/config'
import * as actions from './action'
import { View } from './interface'
import config from './config'
import { withLazy } from '@/utils/with'
import { getMenu, getRoute } from './utils'
import Layout from '@/component/Layout'

// exception
const Exception404 = withLazy(() => import(
  /* webpackChunkName: 'Exceptionn404' */
  '@/view/Exception/404'
))

const LayoutPage: FC<View.Props> = (props) => {
  const { username, role, loading } = props
  const location = useLocation()
  const { pathname } = location

  useEffect(() => {
    actions.initPage()
  }, [])

  const currentMenu = useMemo(() => getMenu(config, role), [role])

  const currentRoute = useMemo(() => getRoute(config, role), [role])

  const nodes = useMemo(() => {
    if (currentRoute.length) {
      return <Switch>
        {currentRoute.map(route => {
          const { path, redirect, exact, component } = route
          if (redirect) {
            return <Redirect key={path} path={path} exact={exact} to={redirect} />
          }
          return <Route key={path} path={path} exact={exact} component={component as React.ComponentClass} />
        })}
        {/* exception */}
        <Route path="/exception/404" exact component={Exception404} />
        <Redirect path="/*" to="/exception/404" />
      </Switch>
    }
    return null
  }, [currentRoute, pathname])

  return (
    <>
      <Layout menu={currentMenu} username={username} loading={loading} onLogout={actions.logout}>
        {nodes}
      </Layout>
    </>
  )
}

const mapStateToProps = (state: any) => {
  const appData: AppStateInterface = state[APP_STORE]
  return {
    id: appData.id,
    role: appData.role,
    username: appData.username,
    loading: appData.loading
  }
}

export default connect(mapStateToProps)(LayoutPage)
