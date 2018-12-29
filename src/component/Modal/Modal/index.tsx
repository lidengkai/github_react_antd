/**
 * @module Modal
 */
import classnames from 'classnames'
import styles from './style.less'
import { ModalProps } from '../interface'
import { Modal as M, Spin } from 'antd'

const Modal: FC<ModalProps> = (props) => {
  const { className, hideOk, okButtonProps, loading, children, ...other } = props

  const currentOkButtonProps = useMemo(() => {
    if (hideOk) {
      return {
        style: { display: 'none' },
        ...(okButtonProps || {})
      }
    }
    if (loading) {
      return {
        disabled: true,
        ...(okButtonProps || {})
      }
    }
    return okButtonProps
  }, [hideOk, okButtonProps, loading])

  return (
    <M className={classnames(styles.main, className)}
      okButtonProps={currentOkButtonProps}
      {...other}
    >
      <div>{children}</div>
      {loading ? <div className={styles.loading}>
        <Spin className={styles.icon} />
      </div> : null}
    </M>
  )
}

export default Modal
