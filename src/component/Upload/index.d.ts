import InternalUpload from './Upload'
import InternalCsv from './Csv'
import {
  initFileList as InternalInitFileList,
  readFileList as InternalReadFileList
} from './config'
import {
  UploadProps,
  CsvProps
} from './interface'

declare namespace Upload {
  type Props = UploadProps
  namespace Csv {
    type Props = CsvProps
  }
}

declare namespace Csv {
  type Props = CsvProps
}

declare const Upload: typeof InternalUpload & {
  Csv: typeof InternalCsv
  initFileList: typeof InternalInitFileList
  readFileList: typeof InternalReadFileList
}

export declare const Csv: typeof InternalCsv

export default Upload
