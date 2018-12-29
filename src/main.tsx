import ReactDOM from 'react-dom'
import { NODE_ENV } from './config'
import App from './App'
import './index.less'

console.log('%c当前环境:' + NODE_ENV, 'background-color: yellow;')

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
