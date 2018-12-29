/**
 * @module Upload
 */
import classnames from 'classnames'
import styles from './style.less'
import { UploadProps } from '../interface'
import {
  DEFAULT_METHOD,
  DEFAULT_ACTION,
  DEFAULT_NAME,
  DEFAULT_DATA,
  getServerPath,
  upload
} from '../config'
import { Upload as U } from 'antd'
import FileList from '../FileList'

const Upload: FC<UploadProps> = (props) => {
  const {
    method = DEFAULT_METHOD,
    action = DEFAULT_ACTION,
    name = DEFAULT_NAME,
    data = DEFAULT_DATA,
    value,
    fileList,
    onChange,
    customRequest,
    multiple,
    showUploadList,
    className,
    style,
    fileClassName,
    fileStyle,
    listType,
    ...other
  } = props

  const doChange = useCallback((value: any[]) => {
    typeof onChange === 'function' && onChange(value)
  }, [onChange])

  const formatFile = useCallback((file: any) => {
    const { response } = file
    return {
      ...file,
      url: getServerPath(response)
    }
  }, [])

  const handleChange = useCallback((obj: any) => {
    const { file, fileList } = obj
    if (multiple) {
      doChange(fileList.map(formatFile))
    } else {
      doChange([formatFile(file)])
    }
  }, [doChange, multiple])

  const handleUpload = useCallback((obj) => {
    const {
      method,
      action,
      filename,
      file,
      data,
      onError,
      onSuccess
    } = obj
    return upload({
      method,
      action,
      name: filename,
      file,
      data
    }).then(res => {
      if (res) {
        onSuccess(res)
      } else {
        onError()
      }
    })
  }, [])

  return (
    <div className={classnames(styles.root, className)} style={style}>
      <div className={styles.upload}>
        <U method={method}
          action={action}
          name={name}
          data={data}
          fileList={value}
          customRequest={handleUpload}
          onChange={handleChange}
          multiple={multiple}
          showUploadList={listType ? true : false}
          listType={listType}
          {...other}
        />
      </div>
      {!listType && showUploadList ?
        <FileList className={fileClassName}
          style={fileStyle}
          value={value}
          onChange={onChange}
        />
        : null}
    </div>
  )
}

export default Upload
