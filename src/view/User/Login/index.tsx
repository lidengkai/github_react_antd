/**
 * @module UserLogin
 */
import { connect } from 'react-redux'
import { NAME } from './flow/constant'
import * as action from './flow/action'
import styles from './style.less'
import { FormInterface, StateInterface, View } from './interface'
import { Form, Input, Checkbox, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

const UserLogin: FC<View.Props> = () => {
  const [form] = Form.useForm()

  const submit = useCallback(() => {
    form.validateFields().then(action.submit as any)
  }, [])

  const initialValues: FormInterface = useMemo(() => {
    return {
      username: 'admin',
      password: '123456',
      remember: false
    }
  }, [])

  const ruleUsername = useMemo(() => [{
    validator: (_: any, value: any) => action.validateUsername(value)
  }], [])

  const rulePassword = useMemo(() => [{
    validator: (_: any, value: any) => action.validatePassword(value)
  }], [])

  useEffect(() => {
    action.initPage()
  }, [])

  return (
    <>
      <Form className={styles.root}
        form={form}
        initialValues={initialValues}
        onFinish={submit}
        scrollToFirstError
      >
        <div className={styles.well}>
          <div className={styles.content}>
            <div className={styles.title}>github_react_antd</div>
            <Form.Item name="username" rules={ruleUsername}>
              <Input size="large"
                placeholder="admin/test"
                autoComplete="off"
                prefix={<UserOutlined />}
              />
            </Form.Item>
            <Form.Item name="password" rules={rulePassword}>
              <Input size="large"
                type="password"
                placeholder="123456"
                autoComplete="off"
                prefix={<LockOutlined />}
              />
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>记住密码</Checkbox>
            </Form.Item>
            <Form.Item>
              <Button type="primary" size="large" htmlType="submit" className={styles.button}>
                登&nbsp;录
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </>
  )
}

const mapStateToProps = (state: any) => {
  const data: StateInterface = state[NAME]
  return {
  }
}

export default connect(mapStateToProps)(UserLogin)
