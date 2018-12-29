import { ModalProps as MProps } from 'antd/lib/modal'

// Modal
export interface ModalProps extends MProps {
  /**
   * @prop {boolean} loading 加载中
   */
  loading?: boolean
  /**
   * @prop {boolean} hideOk 隐藏提交按钮
   */
  hideOk?: boolean
}
