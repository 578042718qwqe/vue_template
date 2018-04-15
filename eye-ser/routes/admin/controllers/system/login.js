
var express = require('express');
var router = express.Router();
var session = require('../../session')
var uuid = require('uuid')
// var dbUtil = require('utils/dbutils')
console.log(require.main.paths + '')
var dbUtil = require('utils/dbutils')
// var dbUtil = require('~/utils/dbutils')
// var x = require(global.prefixPath + 'utils/dbutils')
// // var dbUtil = require('./utils/dbutils')
var log = require('utils/logUtil')
var ajaxResult = require('utils/ajaxResult')
var baseUtil = require('utils/baseUtils')
var uuid = require('uuid')



// /admin/*
const userMap = {
  admin: {
    role: ['admin'],
    token: 'admin',
    introduction: '我是超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  editor: {
    role: ['editor'],
    token: 'editor',
    introduction: '我是编辑',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  },
  user: {
    role: ['user'],
    token: 'user',
    introduction: 'user',
    avatar: '',
    name: 'user'
  }
}

const pwdMap = {
  admin: 'admin7887',
  editor: 'editor7887',
  user: 'user123'
}



router.get('/login/a',function(req,res,next){
  res.end('hello login')
})

// router.get('/login/login',function(req,res,next) {

//   console.log('aaaaaa')
//   res.end('hello aaaa')
// })

router.post('/login/login',function(req,res,next) {

  
  console.log(req.body)
  // res.end('done /login/login')
  // var str = `{
  //   role: ['user'],
  //   token: 'user',
  //   introduction: 'user',
  //   avatar: '',
  //   name: 'Normal User'
  // }`
  var usercode = req.body.usercode
  var password = req.body.password

  var user = dbUtil.getModelByTableName('user')
  var pwd = baseUtil.genMd5(password)

  var p1 = {user_code:usercode,user_pwd:pwd}
  user.findOne(p1)
  .populate('user_roles')
  .exec(function(err,result){
    var ret = ajaxResult.getInstance()
    
    if(err) {
      console.log('err',err)
      log.error(err)
      ret.status = 2
      ret.message = '帐号或者密码错误'
      res.end(JSON.stringify(ret))
    } else if(result == null) {
      ret.status = 2
      ret.message = '帐号或者密码错误'
      res.end(JSON.stringify(ret))
    } else {
      var token = uuid.v4()
      session.updateSession(token)
      // session.putValue(token,'')
      ret.obj = {
        role: [],
        token: token,
        introduction: '',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: result.user_name
      }


      // var test1 = 
      // {
      //   path: '/imageManager',
      //   component: "Layout",
      //   name: 'imageManager', 
      //   meta: {
      //     role: ['user'],
      //     title: 'mgrtag',
      //     icon: 'a'
      //   },
      //   children: [{
      //     path: 'mgr1',
      //     component: "_import('imageMgr/index')",
      //     name: 'imageMgr',
      //     meta: {
      //       title: 'mgrtag',
      //       icon: 'international',
      //       role: ['user'] 
      //     }
      //   }]
      // }
      

      // ret.obj.route1 = test1

      var user_roles = result.user_roles
      user_roles.forEach(function(item) {
        ret.obj.role.push(item.code)
      }) 

      session.putValue(token,'userInfo',ret)
      res.end(JSON.stringify(ret))
    }




  })

  // if(userMap[username] && pwdMap[username] == password) {
  //   // var str = userMap[username]
  //   var retObj = Object.assign({},userMap[username])
  //   var token = uuid.v4()
  //   retObj.token = token
  //   session.updateSession(token)
  //   session.putValue(token,'userInfo',retObj)
  //   var str = JSON.stringify(retObj)
    
  //   res.end(str)
  // } else {
  //   res.end('error')
  // }

})

router.post('/login/getUserInfo',function(req,res,next) {
  console.log('bbbbbbb')
  var sessKey = req.query.token
  var info = session.getValue(sessKey,'userInfo')
  res.end(JSON.stringify(info))

})

router.post('/login/logout',function(req,res,next) {

  
  console.log(req.body)
  // res.end('done /login/login')
  // var str = `{
  //   role: ['user'],
  //   token: 'user',
  //   introduction: 'user',
  //   avatar: '',
  //   name: 'Normal User'
  // }`
  var username = req.body.username
  var password = req.body.password

  if(userMap[username] && pwdMap[username] == password) {
    // var str = userMap[username]
    var str = JSON.stringify(userMap[username])
    res.end(str)
  } else {
    res.end('error')
  }

})

 

// module.exports = [router,  ...a];
module.exports = router











