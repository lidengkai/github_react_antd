import {
  HomeOutlined,
  SettingOutlined,
  FormOutlined,
  TableOutlined,
  LineChartOutlined
} from '@ant-design/icons'
import { withLazy } from '@/utils/with'
import { ConfigInterface } from './interface'

// home
const Home = withLazy(() => import(
  /* webpackChunkName: 'Home' */
  '@/view/Home'
))
// test
const Test = withLazy(() => import(
  /* webpackChunkName: 'Test' */
  '@/view/Test'
))
// component
const ComponentTable = withLazy(() => import(
  /* webpackChunkName: 'ComponentTable' */
  '@/view/Component/Table'
))
const ComponentFormTextBox = withLazy(() => import(
  /* webpackChunkName: 'ComponentFormTextBox' */
  '@/view/Component/Form/TextBox'
))
const ComponentFormSelector = withLazy(() => import(
  /* webpackChunkName: 'ComponentFormSelector' */
  '@/view/Component/Form/Selector'
))
const ComponentFormUpload = withLazy(() => import(
  /* webpackChunkName: 'ComponentFormUpload' */
  '@/view/Component/Form/Upload'
))

const ComponentChart = withLazy(() => import(
  /* webpackChunkName: 'ComponentChart' */
  '@/view/Component/Chart'
))

const route: ConfigInterface = [
  {
    path: '/',
    redirect: '/home',
    role: ['1']
  },
  {
    path: '/',
    redirect: '/test',
    role: ['2']
  },
  {
    label: '首页',
    path: '/home',
    icon: <HomeOutlined />,
    role: ['1', '2'],
    component: Home
  },
  {
    label: '测试',
    path: '/test',
    icon: <SettingOutlined />,
    role: ['2'],
    component: Test
  },
  {
    label: '组件',
    path: '/component',
    icon: <SettingOutlined />,
    role: ['1', '2'],
    children: [
      {
        label: '表格',
        path: '/table',
        icon: <TableOutlined />,
        role: ['1', '2'],
        component: ComponentTable
      },
      {
        label: '表单',
        path: '/form',
        icon: <FormOutlined />,
        role: ['1', '2'],
        children: [
          {
            label: '文本编辑',
            path: '/textBox',
            role: ['1', '2'],
            component: ComponentFormTextBox
          },
          {
            label: '选择器',
            path: '/selector',
            role: ['1', '2'],
            component: ComponentFormSelector
          },
          {
            label: '文件上传',
            path: '/upload',
            role: ['1', '2'],
            component: ComponentFormUpload
          }
        ]
      },
      {
        label: '图表',
        path: '/chart',
        icon: <LineChartOutlined />,
        role: ['1', '2'],
        component: ComponentChart
      }
    ]
  }
]

export default route
