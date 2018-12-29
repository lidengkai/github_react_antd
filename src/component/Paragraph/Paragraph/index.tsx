/**
 * @module Paragraph 段落框
 */
import { Input } from 'antd'
import styles from './style.less'
import { ParagraphProps } from '../interface'

const Paragraph: FC<ParagraphProps> = (props) => {
  const { value, onChange, disabled, placeholder, line = 10 } = props

  const countElem = useRef<any>()

  const handleChange = useCallback((e) => {
    typeof onChange === 'function' && onChange(e.target.value)
  }, [onChange])

  const handleScroll = useCallback((e) => {
    const top = e.target.scrollTop
    countElem.current.scrollTo({ top })
  }, [])

  const currentValue = useMemo(() => {
    const type = typeof value
    if (type === 'string' || type === 'number') {
      return String(value)
    }
    return ''
  }, [value])

  const countNodes = useMemo(() => {
    const vs = currentValue.split('\n')
    const nodes = []
    for (let i = 0, l = vs.length; i < l; i++) {
      const string = vs[i]
      nodes.push(<div key={`${i}-${string}`} className={styles.item}>
        <div className={styles.left}>{i + 1}</div>
        <div className={styles.right}>{string}</div>
      </div>)
    }
    return nodes
  }, [currentValue])

  return (
    <div className={styles.main}>
      <div className={styles.left}></div>
      <div className={styles.right}>
        <Input.TextArea className={styles.textarea}
          disabled={disabled}
          value={currentValue}
          placeholder={placeholder}
          onChange={handleChange}
          autoSize={{ maxRows: line, minRows: line }}
          onScroll={handleScroll}
        />
      </div>
      <div ref={countElem} className={styles.count}>{countNodes}</div>
    </div>
  )
}

export default Paragraph
