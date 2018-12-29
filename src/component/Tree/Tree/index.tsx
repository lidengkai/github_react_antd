/**
 * @module Tree 树选择器
 */
import styles from './style.less'
import { TreeProps } from '../interface'
import T from '../Default'
import { Input } from 'antd'

const Tree: FC<TreeProps> = (props) => {
  const { value, onChange, data, disabled, multiple = true, leafValue, search } = props

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

  return (
    <div className={styles.main}>
      {search ? <div className={styles.search}>
        <Input value={searchText} onChange={handleInput} disabled={disabled} placeholder={searchPlaceholder} />
      </div> : null}
      <div className={styles.tree}>
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
    </div>
  )
}

export default Tree
