import InternalFile from './File'
import InternalCsv from './Csv'
import {
  FileProps,
  CsvProps
} from './interface'

declare namespace File {
  type Props = FileProps
}

declare namespace Csv {
  type Props = CsvProps
}

declare const File: typeof InternalFile & {
  Csv: typeof InternalCsv
}

export declare const Csv: typeof InternalCsv

export default File
