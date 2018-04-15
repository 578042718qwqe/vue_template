
var _ = require('lodash')
var moment = require('moment')
var crypto=require('crypto')

function object2Array(obj) {
  if(obj && !(obj instanceof Array)) {
    return [obj]
  }
  return obj
}

function pick(o, ...props) {
  return Object.assign({}, ...props.map(prop => ({[prop]: o[prop]})));
}

//对象简单属性拷贝,string,number类型，只支持一层
function normalCopy(obj) {

  var ret = {}
  for(var idx in  obj) {
    var item = obj[idx]
    // console.log(typeof(item))
    if(typeof(item) == 'string' || typeof(item) == 'number' || item instanceof Date) {
      ret[idx] = item
    }
  }
  return ret
}

//对象简单属性拷贝,string,number类型，多层
function normalCopy2(obj2,params) {

  var ret = {}
  var obj = obj2

  if(!params) {
    return undefined
  }

  if(obj2 instanceof Array) {
    // ret = arrayDeepCopy()
    // for(var idx in obj) {
    //   ret.push(normalCopy2(obj[idx]))
    // }
    console.log('array?这里不该被执行到,请检查')
  } else {
    
    for(var idx in params) {
      var key = idx
      var value = params[idx]
      if(!obj[key]) {
        continue
      }

      var item = obj[key]
      var item = obj[idx]
      // console.log(typeof(item))
      if(typeof(item) == 'string' || typeof(item) == 'number' || item instanceof Date) {
        ret[idx] = item
      }else if(item instanceof Array) {
        var sub = arrayDeepCopy(item,params[idx])
        ret[idx] = sub
      } else if(item instanceof Object) {
        if(params[idx]) {
          var sub = normalCopy2(item,params[idx])
          ret[idx] = sub
        } else {
          if(item['toString']) {
            ret[idx] = item.toString()
          } else {
            ret[idx] = item
          }
        }
        
      }
    }
    // for(var idx in  obj) {
    //   if(!params[idx] || typeof obj[idx] == 'function') {
    //     continue
    //   }
    //   var item = obj[idx]
    //   // console.log(typeof(item))
    //   if(typeof(item) == 'string' || typeof(item) == 'number' || item instanceof Date) {
    //     ret[idx] = item
    //   }else if(item instanceof Array) {
    //     var sub = arrayDeepCopy(item,params[idx])
    //     ret[idx] = sub
    //   } else if(item instanceof Object) {
    //     var sub = normalCopy2(item)
    //     ret[idx] = sub
    //   }
    // }
  }

  
  return ret
}
 

// 数组对象拷贝,普通属性拷贝,
// params:[{id:''},{depts:{name:''}}]
// level:0 或者不给
function arrayDeepCopy(arr1,params,level) {
  var ret = []
  var _lv = 0
  if(!level) {
    _lv = level
  }

  arr1.forEach(function(item,index){
    var sub = normalCopy2(item,params)
    ret.push(sub)
  });
  // for(var idx in arr1) {

  //   var item = arr1[idx]
    
  // }
  return ret
}


//hour,minute,hour,minute
function daySegment(h1,m1,h2,m2) {
  var mo1 = moment()
  var mo2 = moment()
  mo1.hour(h1)
  mo1.minute(m1)
  mo1.second(0)

  mo2.hour(h2)
  mo2.minute(m2)
  mo2.second(0)
  var arr1 = []
  while(mo2.toDate().getTime() - mo1.toDate().getTime() > 0) {
    
    var dt1 = mo1.format('HH:mm')
    mo1.add('minutes',7)
    var dt2 = mo1.format('HH:mm')
    // console.log(dt1,dt2)
    mo1.add('minutes',1)
    arr1.push({
      label: dt1 + '-' + dt2,
      startDate: dt1,
      endDate: dt2
    })
    
  }
  return arr1
}

function makeDays() {

  var dt1 = daySegment(8,0,12,0)
  var dt2 = daySegment(13,30,17,30)
  var dt3 = dt1.concat(dt2)
  // console.log('dt1:',dt1)
  // console.log('dt2:',dt2)
  // console.log('dt3:',dt3.length)
  return dt3

}
 
function genMd5(value) {
  var md5=crypto.createHash("md5");  
  md5.update(value);  
  var str=md5.digest('hex');  
  var s=str.toUpperCase();  //32位大写  
  return s
}



module.exports = {
  // object2Array:object2Array,
  // normalCopy:normalCopy,
  // normalCopy2:normalCopy2,
  // arrayDeepCopy: arrayDeepCopy,
  // makeDays: makeDays
  genMd5: genMd5
}

