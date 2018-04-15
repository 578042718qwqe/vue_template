var app = require('../app')
const request = require('supertest')(app)

describe.skip('test login',function(){
 
  it('test wrong login',function(done) {

    request.post('/system/login')
    .send({
      user_code:'xxx',
      user_pwd:'xx'
    })
    .expect(200,function(err,res){
      console.log('test wrong login:',res.text)
      var ret1 = JSON.parse(res.text)
      if(ret1.status != 2) {
        throw new Error('error')
      }
      done()
    })
  })

  it('test right login',function(done) {

    request.post('/system/login')
    .send({
      user_code:'testunit1',
      user_pwd:'test1'
    })
    .expect(200,function(err,res){
      console.log('test right login:',res.text)
      var ret1 = JSON.parse(res.text)
      if(ret1.status != 1) {
        throw new Error('error')
      }
      done()
    })
  })


})










