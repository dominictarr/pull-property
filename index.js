module.exports = function (value) {

  var ended = null

  function read(abort, _cb) {
    if(abort) return _cb(true)
    if(value) {
      var _value = value
      value = null
      return _cb(null, _value)
    }
    if(ended) {
      _cb(ended)
    } else {
      cb = _cb
    }
  }

  read.update = function (_value, end) {
    console.log(_value, end)
    ended = end
    if(cb) {
      var _cb = cb
      cb = null
      return _cb(ended, _value)
    }
    if(!end)
      value = _value
  }

  read.end = function (_end) {
    read.update(null, _end || true)
  }

  return read

}


//module/exports = { value ;
//  ended # null
//
//  read # { abort _cb ;
//    ( value ) ? {
//        value # _value
//      } : ended ? _cb (ended) : cb = _cb
//    
//  }
//
//}
//
//
//{ value ;
//  null ended #
//  {
//    abort cb ;
//    value _value =
//
//    
//  } read #
//}
//exports module /
//=
//
//(+ (+ 1 2) 3)
//
//1 . foo 2 `blah 3 5 
//blah(foo(1, 2), 3)

