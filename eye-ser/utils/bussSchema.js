var mongoose = require('mongoose')

var a = mongoose.Schema({
  a: String,
  b: String,
  bb: {type: mongoose.Schema.ObjectId,ref:'b'},
  c: [],
  create_time: {
    type: Date,
    default: Date.now
  },
  update_time: {
    type: Date,
    default: Date.now
  }
},{
  versionKey: false,
  timestamps: { createdAt: 'create_time', updatedAt: 'update_time' }
})

var b = mongoose.Schema({
  a: String,
  b: String,
  c: [],
  create_time: {
    type: Date,
    default: Date.now
  },
  update_time: {
    type: Date,
    default: Date.now
  }
},{
  versionKey: false,
  timestamps: { createdAt: 'create_time', updatedAt: 'update_time' }
})


var user = mongoose.Schema({
  user_code: String,
  user_pwd: String,
  user_name: String,
  user_desc: String,
  user_roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'role' }],//_id
  create_time: {
    type: Date,
    default: Date.now
  },
  update_time: {
    type: Date,
    default: Date.now
  }
},{
  versionKey: false,
  timestamps: { createdAt: 'create_time', updatedAt: 'update_time' }
})

var role = mongoose.Schema({
  code: String,
  path: String,
  name: String,
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'role' },
  
  create_time: {
    type: Date,
    default: Date.now
  },
  update_time: {
    type: Date,
    default: Date.now
  }
},{
  versionKey: false,
  timestamps: { createdAt: 'create_time', updatedAt: 'update_time' }
})

 
// //guahao config
// var config = mongoose.Schema({

   
  
//   create_time: {
//     type: Date,
//     default: Date.now
//   },
//   update_time: {
//     type: Date,
//     default: Date.now
//   }
// },{
//   versionKey: false,
//   timestamps: { createdAt: 'create_time', updatedAt: 'update_time' }
// })

 

module.exports = {
  a: a,
  b: b,
  user: user,
  role: role
}












