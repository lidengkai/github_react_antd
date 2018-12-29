/**
 * @module Default
 */
import styles from './style.less'
import { DefaultProps } from '../interface'
import { Tree, Radio } from 'antd'

const Default: FC<DefaultProps> = (props) => {
  const { value, onChange, data, search = '', disabled, multiple, leafValue, readonly } = props

  const [expandedKeys, setExpandedKeys] = useState<string[]>([])

  const currentData = useMemo(() => {
    const fn = (arr: any): any[] => {
      const info: any[] = []
      if (arr instanceof Array) {
        for (const item of arr) {
          const { key, title, search, children } = item || {}
          if (key) {
            info.push({
              key,
              title,
              search: typeof search === 'string' ? search : typeof title === 'string' ? title : '',
              children: fn(children)
            })
          }
        }
      }
      return info
    }
    return fn(data)
  }, [data])

  const treeData = useMemo(() => {
    const searchText = search.trim()
    const fn = (arr: any, searchText: string = ''): any[] => {
      const info: any = []
      for (const item of arr) {
        const { key, title, search, children } = item
        if (search.indexOf(searchText) > -1) {
          const currentChildren = fn(children)
          if (currentChildren.length) {
            info.push({
              key,
              title,
              children: currentChildren
            })
          } else {
            info.push({
              key,
              title: readonly || multiple ? title : (
                <span className={styles.radio}>
                  <Radio value={key}>{title}</Radio>
                </span>
              )
            })
          }
        } else {
          const currentChildren = fn(children, searchText)
          const disabled = currentChildren.every(t => t.disabled)
          if (currentChildren.length) {
            info.push({
              key,
              title,
              children: currentChildren,
              className: disabled ? styles.hidden : '',
              disabled
            })
          } else {
            info.push({
              key,
              title: readonly || multiple ? title : (
                <span className={styles.radio}>
                  <Radio value={key}>{title}</Radio>
                </span>
              ),
              className: styles.hidden,
              disabled: true
            })
          }
        }
      }
      return info
    }
    return fn(currentData, searchText)
  }, [currentData, search, multiple, readonly])

  const multipleValue = useMemo(() => {
    const currentValue: string[] = []
    if (value instanceof Array) {
      const fn = (arr: any) => {
        for (const item of arr) {
          const { key, children = [] } = item
          if (children.length) {
            fn(children)
          } else if (value.indexOf(key) > -1) {
            currentValue.push(key)
          }
        }
      }
      fn(currentData)
    }
    return currentValue
  }, [value, currentData])

  const handleCheck = useCallback((value) => {
    if (leafValue) {
      const currentValue: string[] = []
      if (value instanceof Array) {
        const fn = (arr: any) => {
          for (const item of arr) {
            const { key, children = [] } = item
            if (children.length) {
              fn(children)
            } else if (value.indexOf(key) > -1) {
              currentValue.push(key)
            }
          }
        }
        fn(currentData)
      }
      typeof onChange === 'function' && onChange(currentValue)
    } else {
      typeof onChange === 'function' && onChange(value)
    }
  }, [onChange, leafValue, currentData])

  const handleRadio = useCallback((e) => {
    typeof onChange === 'function' && onChange(e.target.value)
  }, [onChange])

  const handleExpand = useCallback((expandedKeys) => {
    setExpandedKeys(expandedKeys)
  }, [])

  useEffect(() => {
    const expandedKeys: string[] = []
    const fn = (arr: any) => {
      const { key, children = [] } = arr[0] || {}
      if (key && children.length) {
        expandedKeys.push(key)
        fn(children)
      }
    }
    fn(data)
    setExpandedKeys(expandedKeys)
  }, [currentData])

  return readonly ? (
    <Tree treeData={treeData}
      checkable={false}
      selectable={false}
      defaultExpandAll={false}
    />
  ) :
    multiple ? (
      <Tree treeData={treeData}
        checkedKeys={multipleValue}
        onCheck={handleCheck}
        checkable
        selectable={false}
        expandedKeys={expandedKeys}
        onExpand={handleExpand}
        disabled={disabled}
      />
    ) :
      (
        <Radio.Group value={value as string} onChange={handleRadio} disabled={disabled}>
          <Tree treeData={treeData}
            checkable={false}
            selectable={false}
            expandedKeys={expandedKeys}
            onExpand={handleExpand}
          />
        </Radio.Group>
      )
}

export default Default
