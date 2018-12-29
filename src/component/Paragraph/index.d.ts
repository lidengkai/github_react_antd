import InternalParagraph from './Paragraph'
import { ParagraphProps } from './interface'

declare namespace Paragraph {
  type Props = ParagraphProps
}

declare const Paragraph: typeof InternalParagraph

export default Paragraph
