import { UploadProps as UProps } from 'antd/lib/upload'

// Upload
export interface UploadProps extends UProps<any> {
  value?: any[]
  onChange?(value: any[]): void
  onChange?(): void
  className?: string
  style?: CSSProperties
  fileClassName?: string
  fileStyle?: CSSProperties
}

// Csv
export interface CsvProps {
  multiple?: boolean
  onChange?(value: string[][][], names: string[]): void
  className?: string
  style?: CSSProperties
}

// FileList
export interface FileListProps {
  value?: any[]
  onChange?(value: any[]): void
  className?: string
  style?: CSSProperties
}

export interface UploadRequestInterface {
  method: UProps['method']
  action: string
  name: string
  file: any
  data: any
}

export interface FileInterface<T = any> {
  uid?: string
  status?: string
  name?: string
  url?: string
  type?: string
  response: T
}

export interface InitFileListInterface<T = any> {
  (list: T[]): FileInterface<T>[]
}

export interface ReadFileListInterface<T = any> {
  (list: FileInterface<T>[]): T[]
}
