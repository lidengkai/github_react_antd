/**
 * @module ModalInfo
 */
import { connect } from 'react-redux'
import { NAME } from './flow/constant'
import { Form, Input } from 'antd'
import { ModalInfoFormInterface, StateInterface, View } from './interface'
import {
  initInfo,
  closeInfo,
  submitInfo,
  validateName,
  validateValue
} from './flow/action'
import Modal from '@/component/Modal'

const ModalInfo: FC<View.ModalInfoProps> = (props) => {
  const { show, data, loading } = props
  const { type, id } = data

  const [form] = Form.useForm()

  const initialValues: ModalInfoFormInterface = useMemo(() => {
    return {
      id: 0,
      name: '',
      value: ''
    }
  }, [])

  const col = useMemo(() => ({
    labelCol: { span: 6 },
    wrapperCol: { span: 12 }
  }), [])

  const title = useMemo(() => {
    return type == 'add' ? '新增' :
      type == 'edit' ? '修改' :
        type == 'info' ? '查看' : ''
  }, [type])

  const disabled = useMemo(() => {
    return type == 'info'
  }, [type])

  const ruleName = useMemo(() => [{
    validator: (_: any, value: any) => validateName(value)
  }], [])

  const ruleValue = useMemo(() => [{
    validator: (_: any, value: any) => validateValue(value)
  }], [])

  const submit = useCallback(() => {
    form.validateFields().then(submitInfo as any)
  }, [])

  useEffect(() => {
    if (show) {
      form.resetFields()
      if (type == 'edit' || type == 'info') {
        initInfo(id).then(res => {
          if (res) {
            const { id, name, value } = res
            form.setFieldsValue({ id, name, value })
          }
        })
      }
    }
  }, [show, id, type])

  return (
    <Modal title={title}
      visible={show}
      loading={loading}
      onCancel={closeInfo}
      onOk={submit}
      hideOk={disabled}
    >
      <Form {...col} form={form} initialValues={initialValues}>
        <Form.Item name="id" noStyle><></></Form.Item>
        <Form.Item name="name" label="名称" required rules={ruleName}>
          <Input autoComplete="off" readOnly={disabled} />
        </Form.Item>
        <Form.Item name="value" label="值" required rules={ruleValue}>
          <Input autoComplete="off" readOnly={disabled} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

const mapStateToProps = (state: any) => {
  const data: StateInterface = state[NAME] || {}
  return {
    show: data.infoShow,
    data: data.infoData,
    loading: data.infoLoading
  }
}

export default connect(mapStateToProps)(ModalInfo)
