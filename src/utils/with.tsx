/**
 * @module with 高阶组件
 */
interface WidthLazyProps {
}

interface WithLazyState {
  Component: React.ComponentClass | null
}

// 组件动态加载
export const withLazy = (callback: () => Promise<any>) => {
  return class extends React.Component<WidthLazyProps, WithLazyState> {
    constructor(props: WidthLazyProps) {
      super(props)
      this.state = {
        Component: null
      }
    }

    componentDidMount() {
      if (typeof callback === 'function') {
        callback().then((res: any) => {
          this.setState({
            Component: res.default
          })
        })
      }
    }

    render() {
      const { Component } = this.state
      return Component ? <Component /> : null
    }
  }
}
