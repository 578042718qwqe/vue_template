
var sessionCache = {}

var defConfig = {
    period: 1200000,//ms
    startTime: 111111,
    storage: {

    }

}

function init() {

  setInterval(function(){
    for(var idx in sessionCache) {
      var item = sessionCache[idx]
      if(!isEnable(idx)) {
        console.log('session remove',idx)
        delete sessionCache[idx]
      }
    }
  },60 * 1000)
}


function updateSession(key) {

  if(sessionCache[key]) {
    cfg.startTime = Date.now()
  } else {
    var cfg = Object.assign({},defConfig)
    sessionCache[key] = cfg
    cfg.startTime = Date.now()
  }

}

function putValue(sessKey,key,value) {
  if(sessionCache[sessKey]) {
    var obj = sessionCache[sessKey]
    obj.storage[key] = value
  }
}

function getValue(sessKey,key) {
  if(sessionCache[sessKey]) {
    var obj = sessionCache[sessKey]
    return obj.storage[key]
  }
  return null
}

function isEnable(key) {
  if(!sessionCache[key]) {
    return false
  } else if(sessionCache[key].startTime + sessionCache[key].period < Date.now() ){
    return false
  }
  return true
}


init()

module.exports = {
  updateSession: updateSession,
  isEnable: isEnable,
  putValue: putValue,
  getValue: getValue
}



