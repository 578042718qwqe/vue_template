var app = require('../app')
const request = require('supertest')(app)

describe.skip('test user',function(){

  it('test user add ',function(done) {
    request.post('/system/user/add')
    .send({
      user_code: 'testunit4444',
      user_pwd: 'test1',
      user_roles: ['5a6951e4a589821f5c42e623','5a6951e4a589821f5c42e624'],
      user_depts: ['5a6951e4a589821f5c42e623'],
    })
    .expect(200, function(err,res){

      console.log('user add ret:',res.text)
      var result1 = JSON.parse(res.text)
      request.post('/system/user/findone')
      .send({
        id:result1.obj.id
      })
      .expect(200,function(err,res){
        console.log('find res:',res.text)
        
        //delete user
        request.post('/system/user/delete')
        .send({
          id:result1.obj.id
        })
        .expect(200,function(err,res){
          console.log('delete res:',res.text)
          done()
        })
      })

      
      


      
    });
  }) 


  it('test user list ',function(done) {
    request.post('/system/user/list')
    .send({
      pageIndex: 1,
      pageSize: 2,
      queryStr:'{}'
    })
    .expect(200, function(err,res){

         console.log('user list:',res.text)
         done()
      
    });
  }) 

  
  it('test user list2 ',function(done) {
    request.post('/system/user/list')
    .send({
      pageIndex: 2,
      pageSize: 2,
      queryStr:'{}'
    })
    .expect(200, function(err,res){

         console.log('user list2:',res.text)
         done()
      
    });
  }) 


  it('test user update ',function(done) {
    request.post('/system/user/update')
    .send({
      id:'5a69525768bd7a14a80f2c7a',
      user_roles: ['5a6951e4a589821f5c42e623','5a6951e4a589821f5c42e624'],
      user_depts: ['5a6951e4a589821f5c42e623'],
      user_pwd: 123456
    })
    .expect(200, function(err,res){

         console.log('user update:',res.text)
         done()
      
    });
  }) 

  // it()



})










