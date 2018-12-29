/**
 * @module logo
 */
import styles from './style.less'
import { LogoProps, MiniLogoProps } from '../interface'

export const Logo: FC<LogoProps> = () => {
  return (
    <>
      <div className={styles.default}>
        <div className={styles.content}></div>
      </div>
    </>
  )
}

export const MinLogo: FC<MiniLogoProps> = () => {
  return (
    <>
      <div className={styles.small}>
        <div className={styles.content}></div>
      </div>
    </>
  )
}
