/**
 * @module Hour 时段选择器
 */
import classnames from 'classnames'
import styles from './style.less'
import { HourProps } from '../interface'

const WEEK_NAME = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']

const Hour: FC<HourProps> = (props) => {
  const { text, value, onChange } = props

  const { rows, cols, items } = useMemo(() => {
    const rows = []
    const cols = []
    const items = []
    for (let i = 0; i < 7; i++) {
      rows.push(0)
    }
    for (let i = 0; i < 24; i++) {
      cols.push(0)
    }
    const v = value instanceof Array ? value : []
    for (let week = 0; week < 7; week++) {
      let weekInfo = v[week] instanceof Array ? v[week] : []
      let item = []
      for (let hour = 0; hour < 24; hour++) {
        if (weekInfo.indexOf(hour) > -1) {
          item.push(true)
          rows[week]++
          cols[hour]++
        } else {
          item.push(false)
        }
      }
      items.push(item)
    }
    return { rows, cols, items }
  }, [value])

  const doChange = useCallback((value) => {
    if (typeof onChange === 'function') {
      onChange(value)
    }
  }, [onChange])

  // 选择周期
  const handleClickWeek = useCallback((currentWeek: number) => {
    const value = []
    for (let week = 0; week < 7; week++) {
      const hours = items[week]
      const item = []
      if (week === currentWeek) {
        if (rows[week] < 24) {
          for (let hour = 0; hour < 24; hour++) {
            item.push(hour)
          }
        }
      } else {
        for (let hour = 0; hour < 24; hour++) {
          if (hours[hour]) {
            item.push(hour)
          }
        }
      }
      value.push(item)
    }
    doChange(value)
  }, [items, rows])

  // 选择时段(周期)
  const handleClickArrow = useCallback((currentHour: number) => {
    const value = []
    for (let week = 0; week < 7; week++) {
      const hours = items[week]
      const item = []
      for (let hour = 0; hour < 24; hour++) {
        if (hour === currentHour) {
          if (cols[hour] < 7) {
            item.push(hour)
          }
        } else {
          if (hours[hour]) {
            item.push(hour)
          }
        }
      }
      value.push(item)
    }
    doChange(value)
  }, [items, cols])

  // 选择时段
  const handleClickHour = useCallback((currentWeek: number, currentHour: number) => {
    const value = []
    for (let week = 0; week < 7; week++) {
      const hours = items[week]
      const item = []
      if (week === currentWeek) {
        for (let hour = 0; hour < 24; hour++) {
          const checked = hours[hour]
          if (hour === currentHour) {
            if (!checked) {
              item.push(hour)
            }
          } else {
            if (checked) {
              item.push(hour)
            }
          }
        }
      } else {
        for (let hour = 0; hour < 24; hour++) {
          if (hours[hour]) {
            item.push(hour)
          }
        }
      }
      value.push(item)
    }
    doChange(value)
  }, [items])

  // 选择全部
  const handleClickAll = useCallback(() => {
    const value = []
    for (let week = 0; week < 7; week++) {
      const item = []
      for (let hour = 0; hour < 24; hour++) {
        item.push(hour)
      }
      value.push(item)
    }
    doChange(value)
  }, [])

  // 选择工作日
  const handleClickWork = useCallback(() => {
    const value = []
    for (let week = 0; week < 5; week++) {
      const item = []
      for (let hour = 0; hour < 24; hour++) {
        item.push(hour)
      }
      value.push(item)
    }
    for (let week = 5; week < 7; week++) {
      value.push([])
    }
    doChange(value)
  }, [])

  // 选择周末
  const handleClickWeekend = useCallback(() => {
    const value = []
    for (let week = 0; week < 5; week++) {
      value.push([])
    }
    for (let week = 5; week < 7; week++) {
      const item = []
      for (let hour = 0; hour < 24; hour++) {
        item.push(hour)
      }
      value.push(item)
    }
    doChange(value)
  }, [])

  const weekNode = useMemo(() => {
    return rows.map((row, week) => {
      return (
        <div key={week}
          className={styles.item}
          onClick={_ => handleClickWeek(week)}
        >
          <div className={classnames(styles.box, row < 24 ? '' : styles.active)}></div>
          <div>{WEEK_NAME[week]}</div>
        </div>
      )
    })
  }, [rows])

  const arrowNode = useMemo(() => {
    return cols.map((col, hour) => {
      return (
        <div key={hour}
          className={classnames(styles.arrow, col < 7 ? '' : styles.active)}
          onClick={_ => handleClickArrow(hour)}
        ></div>
      )
    })
  }, [cols])

  const hourNode = useMemo(() => {
    return items.map((item, week) => {
      return <div className={styles.item} key={week}>
        {item.map((i, hour) => {
          return (
            <div key={hour}
              className={classnames(styles.box, i ? styles.active : '')}
              onClick={_ => handleClickHour(week, hour)}
            >{hour}</div>
          )
        })}
      </div>
    })
  }, [items])

  // 渲染text
  const { on, off } = useMemo(() => {
    const [on = null, off = null] = text instanceof Array ? text : []
    return { on, off }
  }, [])

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.right}>
          <div className={classnames(styles.box, styles.active)}></div>
          <div>{on}</div>
          <div className={styles.box}></div>
          <div>{off}</div>
        </div>
        <div className={styles.left}>
          <div onClick={handleClickAll}><a>全部时间</a></div>
          <div onClick={handleClickWork}><a>工作日</a></div>
          <div onClick={handleClickWeekend}><a>周末</a></div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.left}>
          {weekNode}
        </div>
        <div className={styles.right}>
          <div className={styles.body}>
            <div className={styles.item}>{arrowNode}</div>
            {hourNode}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hour
