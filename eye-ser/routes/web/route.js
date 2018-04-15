/** 打算用来做通用web页面 */
var express = require('express')
var router = express.Router()

// var all = require('../utils/requireAll')(__dirname,'buss',true)
// var test1 = require('./buss/test1')
 
// var download = require('./buss/download')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/wstest', function(req, res, next) {
  res.render('wstest', { title: 'Express' });
});

// module.exports = [router,  ...a];
// module.exports = [router]
var ret = [router]
// for(var idx in all) {
//   var item = all[idx]
//   ret.push(item)
// }
module.exports = ret