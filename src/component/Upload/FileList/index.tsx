/**
 * @module FileList
 */
import classnames from 'classnames'
import styles from './style.less'
import { FileListProps } from '../interface'
import { renderFileIcon } from './config'
import { DeleteOutlined } from '@ant-design/icons'

const FileList: FC<FileListProps> = (props) => {
  const {
    value,
    onChange,
    className,
    style
  } = props

  const doChange = useCallback((value: any[]) => {
    typeof onChange === 'function' && onChange(value)
  }, [onChange])

  const removeFile = useCallback((list: any[], index: number) => {
    const value = [...list]
    value.splice(index, 1)
    doChange(value)
  }, [doChange])

  const nodes = useMemo(() => {
    const nodes = []
    if (value instanceof Array) {
      for (let i = 0, l = value.length; i < l; i++) {
        const item = value[i]
        if (item) {
          const { type, name, url } = item
          nodes.push(
            <div className={styles.item} key={i}>
              <div className={styles.left}>
                <div className={styles.icon}>{renderFileIcon(type)}</div>
              </div>
              <div className={styles.text}>
                {
                  url ?
                    <a target="_blank" rel="noopener noreferrer" href={url}>{name}</a>
                    : <span>{name}</span>
                }
              </div>
              <div className={styles.right}>
                <DeleteOutlined className={styles.icon} onClick={_ => removeFile(value, i)} />
              </div>
            </div>
          )
        }
      }
    }
    return nodes
  }, [value, removeFile])

  return (
    <div className={classnames(styles.root, className)} style={style}>{nodes}</div>
  )
}

export default FileList
