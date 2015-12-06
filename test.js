'use strict'

var test = require('tape')
var Observ = require('observ')
var listenIf = require('./')
var watchIf = require('./watch')

test('listen', function (t) {
  t.plan(1)

  var condition = Observ()
  var value = Observ()

  var unlisten = listenIf(condition, value, function (value) {
    t.equal(value, 1)
  })

  value.set(0) // noop

  condition.set(true)
  value.set(1)

  condition.set(false)
  value.set(2) // noop

  unlisten()
  condition.set(true)
  value.set(3)
})

test('watch', function (t) {
  t.plan(2)

  var condition = Observ(true)
  var value = Observ(0)

  watchIf(condition, value, function (value) {
    t.ok(value === 0 || value === 1)
  })

  value.set(1)

  condition.set(false)
  value.set(2) // noop
})

test('watch - initial false', function (t) {
  t.plan(1)

  var condition = Observ(false)
  var value = Observ(0)

  watchIf(condition, value, function (value) {
    t.equals(value, 1)
  })

  value.set(1)
  condition.set(true)
})
