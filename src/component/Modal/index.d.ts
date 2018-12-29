import InternalModal from './Modal'
import { ModalProps } from './interface'

declare namespace Modal {
  type Props = ModalProps
}

declare const Modal: typeof InternalModal

export default Modal
