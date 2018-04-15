var mongoose = require( 'mongoose')
var dbUtil = require('../utils/dbutils')

//示例代码
describe.skip('db test',function(){

  it.skip('db find list',function(done){
    var mod = dbUtil.getModelByTableName('a')
    mod.find({a:1},null,{skip:10,limit:2},function(err,result){
      console.log(result)
      done()
    })
  })

  it.skip('db save',function(done){
    var mod = dbUtil.getModelByTableName('a')
    var mod1 = new mod({a:1,b:1,c:['a','b']})
    mod1.save(function(err,result){
      if(err) {
        // throw new Error('error')
        console.log(err)
      }
      console.log('save obj:',result)
      console.log('save done')
    })

    console.log('save2:')
    var mod2 = new mod({_id: new mongoose.Types.ObjectId(),a:2,b:2,c:['a','b']})
    mod1.save(function(err,result){
      if(err) {
        // throw new Error('error')
        console.log(err)
      }
      console.log('save2 obj:',result)
      console.log('save2 done')
      done()
    })

    console.log('save2 id 经过测试，mongoose中这个id并不准确，采用上面返回的id:',mod2._id)


  })

  it.skip('db find and update one',function(done){
    var mod = dbUtil.getModelByTableName('a')
    mod.findOne({_id:'5a6840d57a188e2fa0933ac5'},function(err,result) {
      // console.log('result1:',result)
      var mod2 = new mod(result)
      mod2.b = 'update1'
      mod2.save()
      done()
    })
  }) 

  it.skip('db aggregate $match',function(done){
    var mod = dbUtil.getModelByTableName('a')
    mod.aggregate([{$match:{'_id':mongoose.Types.ObjectId('5a6840d57a188e2fa0933ac5')}} ],function(err,result){
      console.log('match lookup:',result)
      // console.log('lookup2:',result[1].users)
      done()
    })
  })

  it.skip('db aggregate $lookup',function(done){
    var mod = dbUtil.getModelByTableName('a')
    //c是个数组字段,用数组多对多
    mod.aggregate([{$match:{'_id':mongoose.Types.ObjectId('5a6840d57a188e2fa0933ac5')}},
      {$lookup:{
      from: 'b', 
      localField: 'c', 
      foreignField: 'a', 
      as: 'users' 
    }}],function(err,result){
      console.log('lookup:',result)
      // console.log('lookup2:',result[1].users)
      done()
    })
  }) 

  it.skip('db crete and delete',function(done){
    
    var mod = dbUtil.getModelByTableName('a')
    var moda = new mod({a:10,b:11})
    moda.save(function(err,result){
      if(err) {
        console.log(err)
      } 
      console.log('new id:',result._id)
      mod.remove({_id:result._id},function(err){
        if(err) {
          console.log(err)
        }
        done()
      })
    })

  }) 

  it.skip('db test ref',function(done){

    var moda = dbUtil.getModelByTableName('a')
    var modb = dbUtil.getModelByTableName('b')
    moda.find({},function(err,results){

      // console.log(results)
      console.log('==============')
      for(var idx in results) {
        item = results[idx]
        console.log('ref each:',item)
        if(item.bb) {
          console.log('this bb.a:',item.bb.a)
        }
      }


      done()
    })
    .populate('bb')
    // .exec(function(err,results){

      
    //   console.log('====================================')
    //   // // console.log(results)
    //   // for(var item in results) {
    //   //   if(item) {
    //   //     console.log('bbbbb:',item)
    //   //   }
        
    //   // }
      
    // })


  })


  it.skip('db page test',function(done){
    var moda = dbUtil.getModelByTableName('a')

    dbUtil.pageQuery(1,2,moda,'',{},{},function(err,results){

      console.log('======page data:=====')
      console.log(results)

      
    })

    dbUtil.pageQuery(2,1,moda,'',{},{},function(err,results){

      //错位的，如果这里出现上面的id，表示正确
      console.log('======page2 data:=====')
      console.log(results)

      done()
    })


  })

})























