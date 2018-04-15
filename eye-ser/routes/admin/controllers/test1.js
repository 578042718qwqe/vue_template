var express = require('express');
var router = express.Router();
 
// var download = require('./buss/download')

/* GET home page. */
router.get('/a', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.end('hello /a test')
  // throw Error('aaa')

});

 

// module.exports = [router,  ...a];
module.exports = router