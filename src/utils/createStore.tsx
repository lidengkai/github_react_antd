interface CreateStoreInterface {
  <T = any>(initialState: T): {
    connect(
      callback: (state: T) => any
    ): (Component: React.ComponentClass) => ReactNode
    getState(): T
    init(): void
    dispatch(state: Partial<T>): void
  }
}

const compare = (old: any, next: any) => {
  if (old === next) {
    return true
  }
  if (
    typeof old !== 'object' || old === null
    || typeof next !== 'object' || next === null
  ) {
    return false
  }
  const oldKeys = Object.keys(old)
  const nextKeys = Object.keys(next)
  if (oldKeys.length !== nextKeys.length) {
    return false
  }
  for (let i = 0, l = oldKeys.length; i < l; i++) {
    const key = oldKeys[i]
    if (!Object.hasOwnProperty.call(next, key) || next[key] !== old[key]) {
      return false
    }
  }
  return true
}

const createStore: CreateStoreInterface = (initialState: any = {}) => {
  const info: {
    state: any
    dispatchs: any[]
  } = {
    state: {
      ...initialState
    },
    dispatchs: []
  }
  const bindDispatch = (dispatch: any) => {
    if (info.dispatchs.indexOf(dispatch) < 0) {
      info.dispatchs.push(dispatch)
    }
    return () => {
      const index = info.dispatchs.indexOf(dispatch)
      if (index > -1) {
        info.dispatchs.splice(index, 1)
      }
    }
  }
  const changeState = (state: any) => {
    info.state = state
    for (let i = 0, l = info.dispatchs.length; i < l; i++) {
      info.dispatchs[i]()
    }
  }
  return {
    connect(callback) {
      const getState = typeof callback === 'function' ? () => {
        return callback(info.state) || {}
      } : () => {
        return {}
      }
      return (Component) => {
        return class extends React.Component {
          constructor(props: any) {
            super(props)
            this.state = {
              ...getState()
            }
          }
          dispatch = () => {
            this.setState(getState())
          }
          removeDispatch = bindDispatch(this.dispatch)
          componentWillUnmount() {
            this.removeDispatch()
          }
          shouldComponentUpdate(nextProps: any, nextState: any) {
            return !compare(this.props, nextProps) || !compare(this.state, nextState)
          }
          render() {
            return <Component {...this.props} {...this.state} />
          }
        }
      }
    },
    getState() {
      return info.state
    },
    init() {
      changeState({ ...initialState })
    },
    dispatch(data) {
      changeState({ ...info.state, ...data })
    }
  }
}

export default createStore
