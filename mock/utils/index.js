const fs = require('fs')
const path = require('path')
const formidable = require('formidable')
const { useSession } = require('../config')

module.exports.rootPath = (pathname = '') => {
  return path.join(__dirname, '..', pathname)
}

module.exports.tempPath = (pathname = '') => {
  return path.join(__dirname, '../temp', pathname + '.json')
}

module.exports.publicPath = (pathname = '') => {
  return path.join(__dirname, '../public', pathname)
}

module.exports.lazy = (time = 1000) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

// 读取表单数据
module.exports.readReqFile = function (req) {
  return new Promise(resolve => {
    const form = new formidable.IncomingForm()
    form.parse(req, (err, fields, files) => {
      if (err) {
        return resolve({})
      }
      resolve({ fields, files })
    })
  })
}

// 随机字符串
const random = function (num, chars) {
  let str = ''
  const other = chars instanceof Array ? chars : []
  const size = 62 + other.length
  for (let i = num; i--;) {
    const n = Math.floor(Math.random() * size)
    if (n < 10) {
      str += String.fromCharCode(n + 48)// [0-9]
    } else if (n < 36) {
      str += String.fromCharCode(n + 55)// [a-z]
    } else if (n < 62) {
      str += String.fromCharCode(n + 61)// [A-Z]
    } else {
      str += other[n - 62] || ''// other
    }
  }
  return str
}

// 保存文件
module.exports.saveFile = function (filePath, file) {
  const name = `${Date.now()}-${random(5)}` + path.extname(file.name)
  try {
    const rs = fs.createReadStream(file.path)
    const ws = fs.createWriteStream(filePath + name)
    rs.pipe(ws)
    return {
      name
    }
  } catch (e) {
    return false
  }
}

const readDatasource = (pathname = '') => {
  return new Promise(resolve => {
    fs.readFile(pathname, 'utf-8', (err, str) => {
      let data = null
      if (!err) {
        try {
          data = JSON.parse(str)
        } catch (_) {
        }
        resolve(data)
      }
    })
  })
}

module.exports.readDatasource = readDatasource

const writeDatasource = (pathname = '', data) => {
  let str = ''
  try {
    str = JSON.stringify(data)
  } catch (_) {
  }
  return new Promise(resolve => {
    fs.writeFile(pathname, str, { encoding: 'utf-8', flag: 'w' }, (err) => {
      resolve(!err)
    })
  })
}

module.exports.writeDatasource = writeDatasource

// 多条件查询
module.exports.query = async (pathname = '', opt = {}) => {
  const datasource = await readDatasource(pathname)
  const data = datasource instanceof Array ? datasource : []
  const optKeys = Object.keys(opt)
  return data.find(t => {
    for (let i = 0, l = optKeys.length; i < l; i++) {
      const key = optKeys[i]
      if (t[key] != opt[key]) {
        return false
      }
    }
    return true
  })
}

// 列表
module.exports.list = async (pathname = '', opt = {}) => {
  const datasource = await readDatasource(pathname)
  const data = datasource instanceof Array ? datasource : []
  const { current, pageSize, search, filters, order, sort } = opt
  const currentData = data.filter((item) => {
    for (const key in search) {
      if (item.hasOwnProperty(key)) {
        const str = String(search[key])
        const value = String(item[key])
        if (value.indexOf(str) < 0) {
          console.log(key, str)
          return false
        }
      }
    }
    for (const key in filters) {
      if (item.hasOwnProperty(key)) {
        const str = filters[key]
        const strs = (str ? [].concat(str) : []).map(t => String(t))
        const value = String(item[key])
        if (strs.length && strs.indexOf(value) < 0) {
          console.log(strs)
          return false
        }
      }
    }
    return true
  })
  if (sort && currentData.length && currentData[0].hasOwnProperty(sort)) {
    if (order == 'desc') {
      currentData.sort((a, b) => b[sort] - a[sort])
    }
    if (order == 'asc') {
      currentData.sort((a, b) => a[sort] - b[sort])
    }
  }
  const p = Math.max(current | 0, 1)
  const l = Math.min(Math.max(pageSize | 0, 1), 100)
  const start = (p - 1) * l
  const end = p * l
  return {
    total: currentData.length,
    rows: currentData.slice(start, end)
  }
}

// 添加
module.exports.add = async (pathname = '', opt = {}) => {
  const datasource = await readDatasource(pathname)
  const data = datasource instanceof Array ? datasource : []
  const lastInfo = data[data.length - 1]
  const id = lastInfo ? (Number(lastInfo.id) || 0) + 1 : 1
  const currentData = [...data]
  currentData.push({ ...opt, id })
  return writeDatasource(pathname, currentData)
}

// 查询
module.exports.get = async (pathname = '', opt = {}) => {
  const datasource = await readDatasource(pathname)
  const data = datasource instanceof Array ? datasource : []
  const { id } = opt
  const info = data.find(t => t.id == id)
  return info
}

// 修改
module.exports.set = async (pathname = '', opt = {}) => {
  const datasource = await readDatasource(pathname)
  const data = datasource instanceof Array ? datasource : []
  const { id, ...other } = opt
  const index = data.findIndex(t => t.id == id)
  const info = data[index]
  const currentData = [...data]
  currentData[index] = {
    ...info,
    ...other
  }
  return writeDatasource(pathname, currentData)
}

// 删除
module.exports.del = async (pathname = '', opt = {}) => {
  const datasource = await readDatasource(pathname)
  const data = datasource instanceof Array ? datasource : []
  const { id } = opt
  const index = data.findIndex(t => t.id == id)
  const currentData = [...data]
  currentData.splice(index, 1)
  return writeDatasource(pathname, currentData)
}

module.exports.needLogin = (method, url, whiteList = {}) => {
  if (useSession) {
    const wl = whiteList[method]
    if (wl instanceof Array && wl.includes(url)) {
      return false
    }
    return true
  }
  return false
}

module.exports.readDir = (dir) => {
  return new Promise(resolve => {
    fs.readdir(dir, (err, files) => {
      if (err) {
        return resolve([])
      }
      resolve(files.map(t => {
        return path.join(dir, './', t.replace(/\.js$/, ''))
      }))
    })
  })
}

module.exports.success = (data = null, message = '') => {
  return {
    status: 1,
    data,
    message
  }
}

module.exports.error = (message = '', status = 0) => {
  return {
    status,
    data: null,
    message
  }
}