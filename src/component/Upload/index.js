import Upload from './Upload'
import Csv from './Csv'
import {
  initFileList,
  readFileList
} from './config'

Upload.Csv = Csv

Upload.initFileList = initFileList

Upload.readFileList = readFileList

export default Upload

export {
  Csv
}
