/**
 * @module Csv 下载CSV
 */
import { CsvProps } from '../interface'
const CODE = 'gb2312'
const BOM = '\ufeff'

const FileCsv: FC<CsvProps> = (props) => {
  const {
    name = 'download',
    data,
    children
  } = props

  const text = useMemo(() => {
    if (data instanceof Array) {
      return data.map((item) => {
        if (item instanceof Array) {
          return item.map(str => {
            let s = ''
            let flag = false
            if (typeof str === 'string') {
              for (let i = 0, l = str.length; i < l; i++) {
                const v = str[i]
                if (v === ',') {
                  flag = true
                } else if (v === '"') {
                  s += '"'
                  flag = true
                }
                s += v
              }
            }
            return flag ? `"${s}"` : s
          }).join(',')
        }
        return ''
      }).join('\n')
    }
    return ''
  }, [data])

  const url = useMemo(() => {
    return `data:text/csv;charset=${CODE},${BOM}${text.trim()}`
  }, [text])

  return (
    <a download={name + '.csv'} href={url}>{children}</a>
  )
}

export default FileCsv
