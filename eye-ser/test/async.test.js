
var async = require('async')
var q = require('q')
describe('async test',function(){

  console.log('start')
  it.skip('async test',function(done){

    async.waterfall([function(callback){
      console.log(1)
      callback(null,'2')
    },function(p1,callback){
      console.log('p1:',p1)
      callback(null,'3')
    }],function(err,result){
      console.log('result:',result)
    })

    console.log('end')

    done()


  }) 

  it.skip('q test',function(done){

    var arr = [1,2,3]
    var pros = []
    arr.forEach(function(item){
      var der = q.defer()
      setTimeout(function(){
        console.log('item:',item)
        der.resolve(item)
      },100)
      pros.push(der.promise)
    })
    q.all(pros).then(function(results){
      console.log('result:',results)
      console.log('done---')
      done()
    })

  })
  

})












