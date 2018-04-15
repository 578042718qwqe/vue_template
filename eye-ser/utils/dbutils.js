// import { Db } from './C:/Users/JT/AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/mongodb';
// var Db require('m')


// var MongoClient = require('mongodb').MongoClient
// var Db = require('mongodb').Db
var config = require('../config/config')
// var mongoose = require('mongoose')
// var Model = mongoose.Model
// console.log(config)
var mongoose = require('mongoose')
var schema = require('./bussSchema')
var async = require('async')

var cache = {}

mongoose.connect(config.dbUrl)

function initDb() {
    for(var idx in schema) {
        //初始化全部的表
        getModelByTableName(idx)
    }
}

// /**
//  * mongodb 
//  * @param {*function(db){xx}} callback 
//  * 
//  * callback<Db>
//  */
// function exec( callback ) {

//     MongoClient.connect(config.dbUrl,function (err,client) {
//         if(err) {
//             console.log('数据库错误:')
//             console.log(err)
//             return
//         }
//         var db = client.db(config.defaultDb)
//         callback(db)
//         client.close()
//     })
// }

// mongoose
// getModel('user',{user_code:'a',user_name:'b'})
function getModel(tableName,schema) {
    if(!cache[tableName]) {
        // var schema = mongoose.Schema(schema)
        var model = mongoose.model(tableName,schema,tableName)
        cache[tableName] = model
        return model
    } else {
        return cache[tableName]
    }
}

function getModelByTableName(tableName) {
    return getModel(tableName,schema[tableName])
}

var pageQuery = function (page, pageSize, Model, populate, queryParams, sortParams, callback) {
    var start = (page - 1) * pageSize;
    var $page = {
        pageNumber: page
    };
    pageSize = parseInt( pageSize)
    async.parallel({
        count: function (done) {  // 查询数量
            Model.count(queryParams).exec(function (err, count) {
                done(err, count);
            });
        },
        records: function (done) {   // 查询一页的记录
            Model.find(queryParams).skip(start).limit(pageSize).populate(populate).sort(sortParams).exec(function (err, doc) {
                
                done(err, doc);
            });
        }
    }, function (err, results) {
        var count = results.count;
        // $page.pageCount = (count - 1) / pageSize + 1;
        // $page.results = results.records;
        if(err) {
            console.log('err:',err)
        }
        $page.total = count
        $page.data = results.records
        callback(err, $page);
    });
};
 

initDb()

// console.log(123)
// var mod = getModel('a',{a:String,b:String})

// var mod1 = new mod({a:1,b:2})
// mod1.save(function(err,item) {
//     if(err) {
//         console.log(err)
//     }
    
// })

// mod.find({},function(err,result){
//     console.log('out:')
//     console.log(err)
//     console.log(result)
// })
// console.log(f1)

module.exports = {
    // initDb : initDb,
    // query: query
    // exec: exec,
    getModel: getModel,
    getModelByTableName: getModelByTableName,
    pageQuery: pageQuery
}





















