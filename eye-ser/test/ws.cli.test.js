
var net = require('net')  
var dbUtil = require('utils/dbutils')
var schema = require('utils/bussSchema')
var baseUtil = require('utils/baseUtils')
var config  =require('config/config')
var moment = require('moment')
var mongoose = require('mongoose')
var async = require('async')
var q = require('q')
var uuid = require('uuid')

var retryTimeout = 3000
var io2 = null
var socket2 = null


function run() {
  setTimeout(connect,100)
  // connect()
  setInterval(itlWrite,1000)
  console.log('test his cli run')
}

function connect() {  
  io2 = require('socket.io-client');
  // socket2 = io2.connect('http://127.0.0.1:8181');
  socket2 = io2.connect('ws://127.0.0.1:6887');
  
  socket2.on('connect',function(e){
    console.log('connect:',e)
  })

  socket2.on('connect_error',function(e){
    console.log('connect_error:',e)
  })

  socket2.on('reconnect',function(e){
    console.log('reconnect:',e)
  })
  
  socket2.on('disconnect',function(e){
    console.log('disconnect:',e)
  })

  socket2.on('reconnect_error',function(e){
    console.log('reconnect_error:',e)
  })



  socket2.on('HIS_MESSAGE',function(data){
    console.log('rec data:',data)
  })
  
}
function reconnect() {  
  // if (retriedTimes >= maxRetries) {  
  //     throw new Error('Max retries have been exceeded, I give up.')  
  // }  
  // retriedTimes +=1  
  setTimeout(connect, retryTimeout)  
}  

function itlWrite() {

  // var data1 = cache.shift()
  // if(netEnable) {
  //   if(data1) {
  //     conn.write(JSON.stringify(data1) + '\r\n')
  //   } else {
  //     // var hb = {heratbeat:'1'}
  //     // conn.write(JSON.stringify(hb))
  //     conn.write( config.wx_access_id + '\r\n')
  //     // console.log('send 1')
  //   }
  // }

  var guid = uuid.v4()
  console.log('guid:',guid)

  var obj = {
    "guid": guid, 
    "access_token": "7129c1c2-72a8-4fbc-94fb-b0769a04e197",
    "server_name": "his010",
    "return_flag": 1,
    "message":"aaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafa",
    "data":null
  }

  // obj.message = obj.message + "aaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafa" 
  // obj.message = obj.message + "aaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafa" 
  // obj.message = obj.message + "aaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafa" 
  // obj.message = obj.message + "aaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafa" 
  // obj.message = obj.message + "aaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafa" 
  // obj.message = obj.message + "aaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafa" 
  // obj.message = obj.message + "aaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafa" 
  // obj.message = obj.message + "aaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafa" 
  // obj.message = obj.message + "aaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafa" 
  // obj.message = obj.message + "aaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafa" 
  // obj.message = obj.message + "aaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafa" 
  // obj.message = obj.message + "aaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafa" 
  // obj.message = obj.message + "aaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafa" 
  // obj.message = obj.message + "aaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafaaaaaaaadafasfassafa" 
    
  var reqStr = JSON.stringify(obj)
  // var msg2 = "hello";
  socket2.emit('HIS_MESSAGE', reqStr);
  // conn.write(reqStr + '\r\n')
}

function execute(cmdObj) {

  var cmd = cmdObj.server_name
  // var params = cmdObj.parameters
  switch(cmd) {
    case 'Appointment001':
      //挂号医生列表
      Appointment001(cmdObj)
    break
    case 'Appointment004':
      Appointment004(cmdObj)
    break
    case 'Appointment002':
      Appointment002(cmdObj)
    break
    case 'Appointment003':
      Appointment003(cmdObj)
    break
    case 'Appointment007':
      Appointment007(cmdObj)
    break
    case 'Appointment008':
      Appointment008(cmdObj)
    break
    case 'Appointment009':
      Appointment009()
    break
    default:
    console.log('不可识别的请求:',cmd)
    break

  }

}




// run()


module.exports = {
  run:run
}












