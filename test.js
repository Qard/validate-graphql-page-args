var tap = require('tap')
var validator = require('./')

tap.test('constructs', t => {
  validator({ min: 5, max: 25 })
  t.end()
})

tap.test('validates', t => {
  var validate = validator({
    min: 1,
    max: 10
  })

  t.doesNotThrow(() => {
    validate({ first: 10 })
    validate({ first: 10, after: 'abc123' })
    validate({ first: 10, before: 'abc123' })
    validate({ last: 10 })
    validate({ last: 10, after: 'abc123' })
    validate({ last: 10, before: 'abc123' })
  })

  // Using first and last together is invalid
  t.throws(() => validate({ first: 10, last: 10 }))

  // Using before and after together is invalid
  t.throws(() => validate({ before: 'abc', after: 'abc' }))

  // Can not set limit below minimum
  t.throws(() => validate({ first: 0 }))
  t.throws(() => validate({ last: 0 }))

  // Can not set limit above maximum
  t.throws(() => validate({ first: 11 }))
  t.throws(() => validate({ last: 11 }))

  // Values for before and after must be valid (null, undefined, string)
  const invalids = [ 1, new Date, [], {}, true, /^test/ ]
  const valids = [ null, undefined, "foo" ]
  invalids.forEach(invalid => {
    t.throws(() => validate({ before: invalid }))
    t.throws(() => validate({ after: invalid }))
  })
  valids.forEach(valid => {
    t.doesNotThrow(() => validate({ before: valid }))
    t.doesNotThrow(() => validate({ after: valid }))
  })

  t.end()
})
