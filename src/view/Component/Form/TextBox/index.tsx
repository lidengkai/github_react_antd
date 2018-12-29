/**
 * @module ComponentFormTextBox
 */
import { connect } from 'react-redux'
import { NAME } from './flow/constant'
import * as action from './flow/action'
import styles from './style.less'
import { FormInterface, StateInterface, View } from './interface'
import { Breadcrumb, Card, Form, Button } from 'antd'
import Paragraph from '@/component/Paragraph'

const ComponentFormTextBox: FC<View.Props> = () => {
  const [form] = Form.useForm()

  const initialValues: FormInterface = useMemo(() => {
    return {
      paragraph: ''
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
        <Breadcrumb.Item>文本编辑</Breadcrumb.Item>
      </Breadcrumb>
      <Card className={styles.card}>
        <Form {...col} form={form} onFinish={submit} initialValues={initialValues}>
          <Form.Item label="Paragraph" name="paragraph">
            <Paragraph />
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

export default connect(mapStateToProps)(ComponentFormTextBox)
