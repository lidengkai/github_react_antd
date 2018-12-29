/**
 * @module ComponentFormSelector
 */
import { connect } from 'react-redux'
import { NAME } from './flow/constant'
import * as action from './flow/action'
import styles from './style.less'
import { FormInterface, StateInterface, View } from './interface'
import { Breadcrumb, Card, Form, Button } from 'antd'
import Hour from '@/component/Hour'
import Tree from '@/component/Tree'
import { TreeDataInterface } from '@/component/Tree/interface'

const ComponentFormSelector: FC<View.Props> = () => {
  const [form] = Form.useForm()

  const initialValues: FormInterface = useMemo(() => {
    return {
      hour: [],
      tree: [],
      treeDouble: []
    }
  }, [])

  const col = useMemo(() => ({
    labelCol: {
      xs: 24,
      sm: 7,
      md: 6,
      lg: 6
    },
    wrapperCol: {
      xs: 24,
      sm: 10,
      md: 12,
      lg: 12
    }
  }), [])

  const treeData: TreeDataInterface = useMemo(() => [
    {
      key: '1', title: '1', children: [
        {
          key: '1-1', title: '1-1', children: [
            { key: '1-1-1', title: '1-1-1' },
            { key: '1-1-2', title: '1-1-2' }
          ]
        },
        { key: '1-2', title: '1-2' }
      ]
    },
    {
      key: '2', title: '2', children: [
        { key: '2-1', title: '2-1' },
        { key: '2-2', title: '2-2' }
      ]
    }
  ], [])

  const submit = useCallback(() => {
    form.validateFields().then(action.submit as any)
  }, [])

  useEffect(() => {
    action.initPage()
  }, [])

  return (
    <>
      <Breadcrumb className={styles.breadcrumb}>
        <Breadcrumb.Item>组件</Breadcrumb.Item>
        <Breadcrumb.Item>表单</Breadcrumb.Item>
        <Breadcrumb.Item>选择器</Breadcrumb.Item>
      </Breadcrumb>
      <Card className={styles.card}>
        <Form {...col} form={form} onFinish={submit} initialValues={initialValues}>
          <Form.Item label="Hour" name="hour">
            <Hour text={['已选', '未选']} />
          </Form.Item>
          <Form.Item label="Tree" name="tree">
            <Tree data={treeData} search />
          </Form.Item>
          <Form.Item label="Tree.Double" name="treeDouble">
            <Tree.Double data={treeData} search />
          </Form.Item>
          <Form.Item label=" " colon={false}>
            <Button type="primary" htmlType="submit">Console.log</Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  )
}

const mapStateToProps = (state: any) => {
  const data: StateInterface = state[NAME]
  return {
  }
}

export default connect(mapStateToProps)(ComponentFormSelector)
