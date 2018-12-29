/**
 * @module ComponentFormUpload
 */
import { connect } from 'react-redux'
import { NAME } from './flow/constant'
import * as action from './flow/action'
import styles from './style.less'
import { FormInterface, StateInterface, View } from './interface'
import { Breadcrumb, Card, Form, Button, Tabs } from 'antd'
import Upload from '@/component/Upload'
import CompTable from './CompTable'

const ComponentFormUpload: FC<View.Props> = (props) => {
  const { csvTabs, csvList, tab } = props

  const [form] = Form.useForm()

  const initialValues: FormInterface = useMemo(() => {
    return {
      upload: []
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
    form.setFieldsValue({
      upload: Upload.initFileList([{ name: 'test.png' }])
    })
    action.initPage()
  }, [])

  return (
    <>
      <Breadcrumb className={styles.breadcrumb}>
        <Breadcrumb.Item>组件</Breadcrumb.Item>
        <Breadcrumb.Item>表单</Breadcrumb.Item>
        <Breadcrumb.Item>文件上传</Breadcrumb.Item>
      </Breadcrumb>
      <Card className={styles.card}>
        <Form {...col} form={form} initialValues={initialValues} onFinish={submit}>
          <Form.Item label="Upload" name="upload">
            <Upload accept="image/*" multiple showUploadList fileClassName={styles.upload}>
              <Button>文件上传</Button>
            </Upload>
          </Form.Item>
          <Form.Item label=" " colon={false}>
            <Button type="primary" htmlType="submit">Console.log</Button>
          </Form.Item>
        </Form>
      </Card>
      <Card className={styles.card} title="表格虚拟滚动" extra={
        <Upload.Csv multiple onChange={action.uploadCsv}>
          <Button>Upload.Csv</Button>
        </Upload.Csv>
      }
      >
        {csvList.length ?
          <Tabs activeKey={tab} onChange={action.changeTab}>
            {
              csvList.map((csvTable, index) => {
                return (
                  <Tabs.TabPane tab={csvTabs[index]} key={index.toString()}>
                    <CompTable data={csvTable} />
                  </Tabs.TabPane>
                )
              })
            }
          </Tabs> : null}
      </Card>
    </>
  )
}

const mapStateToProps = (state: any) => {
  const data: StateInterface = state[NAME]
  return {
    csvTabs: data.csvTabs,
    csvList: data.csvList,
    tab: data.tab
  }
}

export default connect(mapStateToProps)(ComponentFormUpload)
