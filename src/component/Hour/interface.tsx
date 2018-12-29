/** Hour */
export interface HourProps {
  /**
   * @prop {string[]} text 标签说明
   */
  text?: string[]
  /**
   * @prop {number[][]} value 值
   */
  value?: number[][]
  /**
   * @prop {(value):void} onChange
   * @param {number[][]} value 值
   */
  onChange?(value: number[][]): void
}
