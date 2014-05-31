
var tape = require('tape')
var pull = require('pull-stream')

var property = require('../')

tape('property', function (t) {

  var p = property(5)

  pull(p, pull.collect(function (err, ary) {
    if(err) throw err
    t.deepEqual(ary, [5,3,2])
    t.end()
  }))

  p.update(3)
  p.update(2)
  p.end()

})

tape('update value overwrites it', function (t) {

  var read = property(5)

  read(null, function (err, data) {
    if(err) throw err
    t.equal(data, 5)
    read.update(2)
    read(null, function (err, data) {
      if(err) throw err
      t.equal(data, 2)
      read.end()
      read(null, function (end, data) {
        t.equal(end, true)
        t.end()
      })
    })
  })

})

tape('unset first property', function (t) {
  var read = property()

  var called = false, called2 = false
  read(null, function (err, data) {
    called = true
    if(err) throw err
    t.equal(data, 5)
    read(null, function (end, data) {
      called2 = true
      t.equal(end, true)
      t.end()
    })

    t.equal(called2, false)
    read.end()
  })
  t.equal(called, false)
  read.update(5)

})


function delay () {
  return function (read) {
    return function (abort, cb) {
      setTimeout(function () {
        read(abort, cb)
      }, 10)
    }
  }
}

tape('property2', function (t) {

  var p = property(3)
  pull(p, delay(), pull.collect(function (err, ary) {
    if(err) throw err
    t.deepEqual(ary, [2])
    t.end()
  }))

  setTimeout(function () {
    p.update(5)
    p.update(3)
    p.update(2)
    p.end()
  })

})

