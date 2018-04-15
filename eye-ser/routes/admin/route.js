/**
 * admin
 * 所有系统请求入口
 */

var express = require('express')
var router = express.Router()

var all = require('../../utils/requireAll')(__dirname,'controllers',true)
var session = require('./session')
// var test1 = require('./buss/test1')
// var download = require('./buss/download')



//白名单
var whiteMapping = {
  '/login/login': 1,
  '/login/logout': 1
}

//admin的拦截器 一定要写在上面。。
router.use(function(req,res,next){
  res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})

  console.log('req:',req.method,req.url,req.body)
  if(whiteMapping[req.url]) {
    next()
  } else {

    var ret = {
      status : 3,
      message : '登录超时或者未授权访问'
    }
    if(req.method == 'POST') {
      var token = req.headers['x-token']
      if(session.isEnable(token)) {
        next()
      } else {
        next()
        // res.end(JSON.stringify(ret))
      }
    } else {
      // var arg=url.parse(req.url).query
      // var p1 = qs.parse(arg)
      // var token = p1.token
      // console.log(p1)
      //GET 权限以后再做
      next()
    }
    // var sessKey = req.method
    // session.isEnable
  }

  // console.log('hello:' + req.url)
  // next()
})


/* GET home page. */
router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
  res.end('admin index')
});

// router.get('/wstest', function(req, res, next) {
//   res.render('wstest', { title: 'Express' });
// });

// module.exports = [router,  ...a];
// module.exports = [router]
var ret = [router]
for(var idx in all) {
  var item = all[idx]
  ret.push(item)
}
module.exports = ret