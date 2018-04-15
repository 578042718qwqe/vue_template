/** 
 * https://segmentfault.com/a/1190000007060920
 * 
 * const requireDir = require('path/to/require-dir')
 * 第一个参数固定为__dirname，第二个参数为需要require的目录。
 * 
 * 一. 树状结构
   将整个目录中所有的js模块进行迭代，返回一个对象，对象的属性结构和目录结构一致，如果文件夹或者文件名中有非字母数字的字符，其对应的对象属性中则会移除该字符并且以其作为分隔进行驼峰式命名，如下面的other-thing.js
   const lalala = requireDir(__dirname, 'path/to/lalala')
   lalala的结构为，

   {
     user: require('path/to/user.js')
     wxdir: {
        event: require('path/to/event.js'),
        otherThing: require('path/to/other-thing.js')
     }
   }
二. 平行结构

1.依然将整个目录的js进行迭代，只不过返回的对象不是树状结构，而是将它与传入路径的相对路径进行分割和驼峰式命名

const lalala2 = require(__dirname, 'path/to/lalala', true)
lalala2的结构为

{
  user: require('path/to/user.js'),
  wxdirEvent: require('path/to/event.js'),
  wxdirOtherThing: require('path/to/other-thing.js')
}


2.自定义命名规则，第三个参数可以传入一个对象{ nameHandler: func }，func的唯一参数是一个字符串，返回值还是字符串，requireDir返回的对象的属性则是原本的熟悉传入func后的返回值

const lalala3 = require(__dirname, 'path/to/lalala', { nameHandler: i => `$${i}` })
lalala3的结构为

{
  $user: require('path/to/user.js'),
  $wxdirEvent: require('path/to/event.js'),
  $wxdirOtherThing: require('path/to/other-thing.js')
}

*/


const fs = require('fs')
const path = require('path')
const dirPath = []
const tree = {}
const notTree = {}

const dirFilter = absolutePathStr => fs.lstatSync(absolutePathStr).isDirectory()

const jsFileFilter = absolutePathStr => fs.lstatSync(absolutePathStr).isFile() && absolutePathStr.endsWith('.js')

const openDir = dir => {
  let readRes = fs.readdirSync(dir)
  dirPath.push(...readRes.map(p => path.join(dir, p)).filter(jsFileFilter))
  readRes.map(p => path.join(dir, p)).filter(dirFilter).forEach(i => openDir(i))
}

const camelCase = name => {
  let spil = name.trim().split(/[^0-9a-zA-Z]/).filter(i => (i !== ''))
  return (spil.shift() + spil.map(i => (`${i.charAt(0).toUpperCase()}${i.substr(1)}`)).join(''))
}

const propsArrHanler = (parent, arr) => {
  if (!parent[arr[0]] && arr.length > 0) parent[camelCase(arr[0])] = {}
  return (arr.length > 1) ? propsArrHanler(parent[arr.shift()], arr) : parent[arr.shift()] || parent
}

module.exports = (thisDir, dir, options) => {
  if (typeof options !== 'object') {
    options = { isNoTree: options, nameHandler: name => name }
  } else if (!options.nameHandler) {
    options.isNoTree = true
    options.nameHandler = name => name
  } else {
    options.isNoTree = true
    if (typeof options.nameHandler('testStr') !== 'string') throw new Error('function "nameHandler" must return a string')
  }

  let baseDir = path.isAbsolute(dir) ? dir : path.join(thisDir, dir)

  if (!tree[baseDir]) {
    tree[baseDir] = {}
    notTree[baseDir] = {}
  } else if (options.isNoTree) {
    return notTree[baseDir]
  } else {
    return tree[baseDir]
  }

  openDir(baseDir)

  dirPath.forEach(i => {
    // do tree
    propsArrHanler(tree[baseDir], i.split(baseDir)[1].split(path.sep).slice(0, -1).filter(i => (i !== '')))[camelCase(path.basename(i, 'js'))] = require(i)
    // do notTree
    notTree[baseDir][options.nameHandler(camelCase(i.split(baseDir)[1].split(path.sep).slice(0, -1).filter(i => (i !== '')).concat(path.basename(i, 'js')).map(i => camelCase(i)).join('.')))] = require(i)
  })

  dirPath.splice(0, dirPath.length)
  return options.isNoTree ? notTree[baseDir] : tree[baseDir]
}