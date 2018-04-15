var express = require('express')
var router = express.Router()
var ajaxResult = require('utils/ajaxResult')
var baseUtil = require('utils/baseUtils')
var dbUtil = require('utils/dbutils')
var bussSchema = require('utils/bussSchema')
var log = require('utils/logUtil')
var bussSysMaintenanceConfig = require('utils/bussSysMaintenanceConfig')

/**
 * 通用查询列表请求
 * _tb:单表名
 * 
 */
router.post('/sys_maintenance/list',function(req,res,next){

  var body = req.body
  var _tb = body._tb

  var ret = ajaxResult.getInstance()
  if(!_tb) {
    next(Error('数据错误'))
    return 
  }

  var tbMod = dbUtil.getModelByTableName(_tb)
  var tbsc = bussSchema[_tb]
  var seobj = tbsc.obj
  var params = {}
  for(var idx in body) {
    var item = body[idx]
    if(seobj[idx]) {
      params[idx] =  item
    }

  }

  tbMod.find(params)
  .select('-user_pwd')//就1个,写死得了
  .exec(function(err,results){
    if(err){
      log.error(err)
      ret.status = 2
      ret.message = "查询错误"
      res.end(JSON.stringify(ret))
    } else {
      ret.rows = results
      ret.message = '查询成功'
      res.end(JSON.stringify(ret))
    }

  })


})

router.post('/sys_maintenance/addOrUpdate',function(req,res,next){
  var body = req.body
  var _tb = body._tb
  var _id = body._id

  var ret = ajaxResult.getInstance()
  if(!_tb) {
    ret.status = 2
    ret.message = "编辑错误"
    res.end(JSON.stringify(ret))
    return 
  }

  var tbMod = dbUtil.getModelByTableName(_tb)
  var tbsc = bussSchema[_tb]
  var seobj = tbsc.obj
  var params = {}
  for(var idx in body) {
    var item = body[idx]
    if(seobj[idx]) {
      params[idx] =  item
    }
  }

  if(!_id) {
    //add
    var repParam = {}
    var repObj = bussSysMaintenanceConfig.tbRepeat[_tb]
    if(repObj) {
      for(var idx in repObj) {
        if(body[idx]) {
          repParam[idx] = body[idx]
        } else {
          // ret.status = 2
          // ret.message = '字段数据错误'
          // res.end(JSON.stringify(ret))
          // return
          next(Error('字段数据错误'))
        }
      }

      tbMod.findOne(repParam)
      .exec(function(err,result){
        if(err) {
          log.error(err)
          next(Error('编辑错误'))
          return 
        } 
        if(result) {
          next(Error('数据重复'))
          return 
        } 
        var tbMod1 = new tbMod(params)
        tbMod1.save(function(err,result){
          if(err) {
            log.error(err)
            next(Error('编辑错误'))
          }
          ret.message = '添加成功'
          res.end(JSON.stringify(ret))

        })
      })

    }

  } else {
    //update
    tbMod.findOne({_id:_id})
    .exec(function(err,result){
      if(err) {
        log.error(err)
        next(Error('编辑失败'))
        return 
      } 
      if(!result) {
        next(Error('无此记录'))
        return 
      }
      for(var idx in params) {
        result[idx] = params[idx]
      }
      var tbMod1 = new tbMod(result)

      tbMod1.save(result,function(err,result){
        if(err) {
          log.error(err)
          next(Error('编辑失败'))
          return
        }
        ret.message = '保存成功'
        res.end(JSON.stringify(ret))

      })

    })

  }





})

router.post('/sys_maintenance/delete',function(req,res,next){
  var body = req.body
  var _tb = body._tb

  var ret = ajaxResult.getInstance()
  if(!_tb) {
    res.end(JSON.stringify(ret))
    return 
  }

  var tbMod = dbUtil.getModelByTableName(_tb)
  var tbsc = bussSchema[_tb]
  var _id = body._id
  tbMod.findOne({_id:_id})
  .exec(function(err,result){
    if(err) {
      log.error(err)
      next(Error('删除错误'))
      return
    }

    if(!result) {
      next(Error('记录不存在'))
    } else {
      tbMod.remove({_id:_id})
      .exec(function(err){
        if(err) {
          log.error(err)
          next(Error('删除失败'))
        } else {
          ret.message = '删除成功'
          res.end(JSON.stringify(ret))
        }
      })
    }

  })

})



module.exports = router









