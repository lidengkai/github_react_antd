// Paragraph
export interface ParagraphProps {
  /**
   * @prop {string} value 值
   */
  value?: string
  /**
   * @prop {(value):void} onChange change事件
   * @param {string} value 值
   */
  onChange?(value: string): void
  /**
   * @prop {boolean} disabled 禁用
   */
  disabled?: boolean
  /**
   * @prop {string} placeholder 提示
   */
  placeholder?: string
  /**
   * @prop {number} line 显示的行数
   * @default 10
   */
  line?: number
}
