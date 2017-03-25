function validCursorType(v) {
  return v === null || !!~['string', 'undefined'].indexOf(typeof v)
}

module.exports = validator
function validator(opts) {
  opts = opts || {}
  var min = opts.min || 1
  var max = opts.max || 100

  return function (args) {
    // Validate conflicting args are not present
    if (args.first && args.last) {
      throw new Error('Can not use both first and last together')
    }
    if (args.before && args.after) {
      throw new Error('Can not use both before and after together')
    }

    // Validate requested limits do not exceed allowable range
    if (args.first > max || args.last > max) {
      throw new Error('Can not request more than ' + max + ' records at a time')
    }
    if (args.first < min || args.last < min) {
      throw new Error('Can not request less than ' + min + ' records at a time')
    }

    // Validate cursor position fields are valid
    if (!validCursorType(args.before)) {
      throw new Error('Value for `before` must be a string, undefined or null')
    }
    if (!validCursorType(args.after)) {
      throw new Error('Value for `after` must be a string, undefined or null')
    }
  }
}
