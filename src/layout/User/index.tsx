import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { APP_STORE, AppStateInterface } from '@/config'
import * as actions from './action'
import { withLazy } from '@/utils/with'
import { useEffect } from 'react'
import { View } from './interface'
// views
const UserLogin = withLazy(() => import(
  /* webpackChunkName: 'UserLogin' */
  '@/view/User/Login'
))

const LayoutUser: FC<View.Props> = () => {
  useEffect(() => {
    actions.initPage()
  }, [])

  return (
    <>
      <Switch>
        <Redirect path="/user" exact to="/user/login" />
        <Route path="/user/login" exact component={UserLogin} />
        <Redirect path="/*" to="/exception/404" />
      </Switch>
    </>
  )
}

const mapStateToProps = (state: any) => {
  const data: AppStateInterface = state[APP_STORE]
  return {
  }
}

export default connect(mapStateToProps)(LayoutUser)
