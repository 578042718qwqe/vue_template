var ret = {
  rows: [],
  total: 0,
  status: 1,//1:succ 2:failure 3:timeout 4:other
  message: '',
  obj: {}
}

function getInstance() {
  var str = JSON.stringify(ret)
  var obj = JSON.parse(str)
  return obj
}
module.exports = {
  getInstance: getInstance
}