

var bussSchema = require('./bussSchema')

//排除字段
var excludeField = {
  user: {
    user_pwd: 1
  }
}



//数据重复配置
var tbRepeat = {
  user: {
    user_code: 1
  },
  role: {
    code: 1
  }
}







module.exports = {
  excludeField: excludeField,
  tbRepeat: tbRepeat
}


