// var md5=require("md5")  

// var s1 = md5('1111')
// console.log(s1)

var crypto=require('crypto');  
var md5=crypto.createHash("md5");  
md5.update("abcdef");  
var str=md5.digest('hex');  
var s=str.toUpperCase();  //32位大写  
console.log(s);  