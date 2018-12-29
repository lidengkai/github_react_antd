/**
 * @module Csv
 */
import classnames from 'classnames'
import styles from './style.less'
import { CsvProps } from '../interface'
import { readCsv } from './config'
import { Upload as U } from 'antd'

const UploadCsv: FC<CsvProps> = (props) => {
  const {
    onChange,
    multiple,
    className,
    style,
    children
  } = props

  const doChange = useCallback((value: string[][][], names: string[]) => {
    typeof onChange === 'function' && onChange(value, names)
  }, [onChange])

  const handleChange = useCallback((file, fileList) => {
    if (fileList.indexOf(file) === 0) {
      if (multiple) {
        Promise.all(fileList.map(readCsv)).then(res => {
          doChange(res as string[][][], fileList.map((file: any) => file.name))
        })
      } else {
        readCsv(file).then(res => doChange([res], [file.name]))
      }
    }
    return false
  }, [doChange, multiple])

  const handleUpload = useCallback(() => {
  }, [])

  return (
    <div className={classnames(styles.root, className)} style={style}>
      <div className={styles.upload}>
        <U accept=".csv"
          customRequest={handleUpload}
          beforeUpload={handleChange}
          multiple={multiple}
          showUploadList={false}
          fileList={[]}
        >{children}</U>
      </div>
    </div>
  )
}

export default UploadCsv
