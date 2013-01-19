// Enhances the server object with 100 baconipsum "emails"
var _ = require('underscore')
, http = require('http')
, _randomString = function(array) {
  array = _.invoke(array, String.prototype.trim)
  array = _.without(array, '')
  return array[_.random(array.length-1)]
}

module.exports = function(server) {
  return function(req, res, next) {
    if (server.get('emails')) return next()

    var config = server.get('config')
    , bacon = ''
    , meat = 'http://baconipsum.com/api/'
    meat += '?type=' + config.bacon_type
    meat += '&paras=' + config.bacon
    http.get(meat, function(res) {
      res.setEncoding('utf8')
      res.on('data', function(chunk) { bacon += chunk })
      res.on('end', function() {
        bacon = JSON.parse(bacon)
        var emails = _.map(bacon, function(paragraph, index) {
          // Clean up the output. get rid of duplicate periods, whitespace
          paragraph = paragraph.replace(/\s+/g, ' ').replace(/\.+/g, '.')
          var sentence = _randomString(paragraph.split('.'))
          , user = _randomString(sentence.replace(',', '').split(' '))
          return {
            id: index
          , email: user.toLowerCase() + '@example.com'
          , subject: paragraph.split('.')[0]
          , body: paragraph
          }
        })
        server.set('emails', emails)
        next()
      })
    }).on('error', function(e) { console.error(e) })
  }
}