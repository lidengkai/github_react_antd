import jschardet from 'jschardet'

// 读取文件编码
const readFileEncoding = (file: any): Promise<string> => {
  return new Promise(resolve => {
    const fr = new FileReader()
    fr.onload = () => {
      const { encoding } = jschardet.detect(fr.result as string)
      resolve(['UTF-16LE', 'UTF-8'].indexOf(encoding) > -1 ? encoding : 'GB2312')
    }
    fr.readAsBinaryString(file)
  })
}

// 读取文件内容
const readFileContent = (file: any, encoding: string): Promise<string> => {
  return new Promise(resolve => {
    const fr = new FileReader()
    fr.onload = () => {
      resolve(fr.result as string)
    }
    fr.readAsText(file, encoding)
  })
}

// 格式化文件内容
const formatFileContent = (str: string, separator: string): {
  data: string[][],
  flag: boolean,
  size: number
} => {
  // 总数据
  let data = []
  // 行数据
  let line = []
  // 单元格数据
  let word = ''
  // 是否有转义
  let hasTransfer = false
  // 判断列表是否一致
  let size = 0
  let flag = true
  const readFlag = () => {
    const current = line.length
    if (flag) {
      if (size) {
        if (size !== current) {
          flag = false
        }
      }
    }
    size = Math.max(size, current)
  }
  for (let i = 0, l = str.length; i < l; i++) {
    const code = str[i]
    if (hasTransfer) {
      if (code === '"') {
        const next = str[i + 1]
        if (next === '"') {// 转义双引号
          word += '"'
          i++
        } else {// 转义结束
          hasTransfer = false
        }
      } else {
        word += code
      }
    } else {
      if (code === '"') {
        hasTransfer = true
      } else if (code === '\n' || code === '\r') {// 行结束
        line.push(word.trim())
        if (line.some(t => t)) {
          data.push(line)
          readFlag()
        }
        line = []
        word = ''
        // 移除后续的换行符
        let removeNum = 0
        for (let ri = i; ++ri;) {
          const next = str[ri]
          if (next === '\n' || next === '\r') {
            removeNum++
          } else {
            break
          }
        }
        i += removeNum
      } else if (code === separator) {
        line.push(word.trim())
        word = ''
      } else {
        word += code
      }
    }
  }
  // 文件结束
  line.push(word.trim())
  if (line.some(t => t)) {
    data.push(line)
    readFlag()
  }
  return {
    data,
    flag,
    size
  }
}

// 筛选文件数据
const dealFileContent = (str: string): string[][] => {
  const { data: tabData, flag: tabFlag, size: tabSize } = formatFileContent(str, '\t')
  if (tabSize > 1) {
    return tabData
  }
  const { data: semicolonData, flag: semicolonFlag, size: semicolonSize } = formatFileContent(str, ';')
  if (semicolonFlag && semicolonSize > 1) {
    return semicolonData
  }
  const { data: commaData, flag: commaFlag, size: commaSize } = formatFileContent(str, ',')
  return commaData
}

// 解析文件
export const readCsv = (file: any): Promise<string[][]> => {
  return readFileEncoding(file).then((encoding: string) => {
    return readFileContent(file, encoding)
  }).then((str: string) => {
    return dealFileContent(str)
  })
}
