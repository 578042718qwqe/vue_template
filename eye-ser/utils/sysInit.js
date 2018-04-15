
var mongoose = require('mongoose')
var dbUtils = require('./dbutils')
var async = require('async')
var moment = require('moment')
var config = require('../config/config')
var log = require('../utils/logUtil')
var baseUtil = require('../utils/baseUtils')

function addRoleIfNotExist(userRole,code,obj,callback) {
  userRole.find({code:code},function(err,results){
    if(err) {
      console.log(err)
      log.error(err)
      callback()
      return
    }
    else if(results.length == 0) {
      var role1 = new userRole(obj)
      role1.save(function(err,result){
        if(err) {
          console.log(err)
          log.error(err)
        }
        role = result
        callback()
      })
      
    } else {
      role = results[0]
      callback()
    }

  })
}

//全局数据初始化
function init() {
  
  moment.locale('zh-cn')
  var userMod = dbUtils.getModelByTableName('user')
  var userRole = dbUtils.getModelByTableName('role')
  var role = null

  //admin角色和用户初始化，如果没有就创建一个
  async.waterfall([
    function(callback){
      addRoleIfNotExist(userRole,'admin',{code:'admin',path:'0000',name:'超级管理员'},callback)
    },
    function(callback) {

      var roleMod = dbUtils.getModelByTableName('role')
      roleMod.findOne({code:'admin'},function(err,result){

        if(err) {
          console.log('err',err)
          log.error(err)
        }
        var role = result
        //user
        userMod.find({user_code:'admin'},function(err,results){
          if(err) {
            console.log(err)
            log.error(err)
            callback()
            return 
          }
          // console.log('results:',results)
          if(results.length == 0) {
            var pwd = 'admin7887'
            pwd = baseUtil.genMd5(pwd)
            var user1 = new userMod({user_code:'admin',user_pwd:pwd,user_roles:[role._id],user_depts:[]})
            user1.save()
            callback()
          } else {
            callback()
          }
          
          // callback()
      
        })//.populate('user_roles')
      })
      
      
    },function(callback){
      // var configMod = dbUtils.getModelByTableName('config')
      // configMod.findOne({},function(err,result){
      //   if(err) {
      //     console.log('err:',err)
      //     log.error(err)
      //   }
      //   // console.log('find:',result)
      //   if(result == null) {
      //     var config1 = new configMod({
      //       wx_access_id: 0,
      //       hosp_id: '',
      //       hosp_name: '',
      //       hosp_address: '',
      //       his_access_token: ''
      //     })
      //     config1.save(function(err,result){
      //       if(err) {
      //         console.log('err:',err)
      //         log.error(err)
      //       }
      //     })
      //     callback()
      //   } else {
      //     config.wx_access_id = result.wx_access_id
      //     config.hospId = result.hosp_id
      //     config.hospName = result.hosp_name
      //     config.hosp_address = result.hosp_address
      //     config.his_access_token = result.his_access_token
      //     callback()
      //   }
      //  
      // })

      callback()
      
    }
  ],function(err,result){

    if(err) {
      console.log(err)
      log.error(err)
    }

  })


  

}










module.exports = {
  init: init
}

