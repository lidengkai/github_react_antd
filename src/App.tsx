import { Provider } from 'react-redux'
import { Router, Switch, Route } from 'react-router-dom'
import store from './store'
import history from './history'
import { withLazy } from '@/utils/with'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'

const LayoutUser = withLazy(() => import(
  /* webpackChunkName: 'LayoutUser' */
  '@/layout/User'
))

const LayoutPage = withLazy(() => import(
  /* webpackChunkName: 'LayoutPage' */
  '@/layout/Page'
))

const App: FC<{}> = () => {
  return (
    <>
      <ConfigProvider locale={zhCN}>
        <Provider store={store}>
          <Router history={history}>
            <Switch>
              <Route path="/user" component={LayoutUser} />
              <Route path="/" component={LayoutPage} />
            </Switch>
          </Router>
        </Provider>
      </ConfigProvider>
    </>
  )
}

export default App
