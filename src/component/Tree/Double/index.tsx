/**
 * @module Double 双树选择器
 */
import styles from './style.less'
import { DoubleProps } from '../interface'
import T from '../Default'
import { Input } from 'antd'

const Tree: FC<DoubleProps> = (props) => {
  const { value, onChange, data, disabled, multiple = true, leafValue, search, title } = props

  const [searchText, setSearchText] = useState<string>('')

  const handleInput = useCallback((e) => {
    setSearchText(e.target.value)
  }, [])

  const searchPlaceholder = useMemo(() => {
    if (typeof search === 'string') {
      return search.trim()
    }
    return ''
  }, [search])

  const currentData = useMemo(() => {
    const fn = (arr: any): any[] => {
      const info: any[] = []
      if (arr instanceof Array) {
        for (const item of arr) {
          const { key, title, children } = item || {}
          if (key) {
            info.push({
              key,
              title,
              children: fn(children)
            })
          }
        }
      }
      return info
    }
    return fn(data)
  }, [data])

  const allValue = useMemo(() => {
    const value: string[] = []
    const fn = (arr: any) => {
      for (const item of arr) {
        const { key, children = [] } = item
        if (children.length) {
          if (!leafValue) {
            value.push(key)
          }
          fn(children)
        } else {
          value.push(key)
        }
      }
    }
    fn(currentData)
    return value
  }, [currentData, leafValue])

  const handleAll = useCallback(() => {
    typeof onChange === 'function' && onChange(allValue)
  }, [onChange, allValue])

  const handleClear = useCallback(() => {
    typeof onChange === 'function' && onChange([])
  }, [onChange])

  const showData = useMemo(() => {
    const currentValue = multiple ? value : [value]
    if (currentValue instanceof Array) {
      const fn = (arr: any) => {
        const info: any[] = []
        for (const item of arr) {
          const { key, title, children = [] } = item
          if (children.length) {
            const currentChildren = fn(children)
            if (currentChildren.length) {
              info.push({
                key,
                title,
                children: currentChildren
              })
            }
          } else if (currentValue.indexOf(key) > -1) {
            info.push(item)
          }
        }
        return info
      }
      return fn(currentData)
    }
    return []
  }, [currentData, value, multiple])

  return (
    <div className={styles.main}>
      {search ? <div className={styles.search}>
        <Input value={searchText} onChange={handleInput} disabled={disabled} placeholder={searchPlaceholder} />
      </div> : null}
      <div className={styles.header}>
        <div className={styles.item}>
          <div className={styles.content}>
            <div className={styles.left}>{title}</div>
            <div className={styles.right}>
              {!multiple || disabled ? null : <a onClick={handleAll}>全选</a>}
            </div>
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.content}>
            <div className={styles.left}>已选择</div>
            <div className={styles.right}>
              {!multiple || disabled ? null : <a onClick={handleClear}>全部清除</a>}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.tree}>
        <div className={styles.item}>
          <div className={styles.content}>
            <T value={value}
              onChange={onChange}
              data={data}
              disabled={disabled}
              multiple={multiple}
              leafValue={leafValue}
              search={searchText}
            />
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.content}>
            <T value={value}
              data={showData}
              readonly
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tree
