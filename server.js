var _ = require('underscore')
, express  = require('express')
, server = express()
, pubdir = __dirname + '/public'
, config = require(__dirname + '/config.json')
, _relativeIndex = function(index, total) {
  if (index >= total)
    index = index - (total * ~~(index/total))
  return index
}

server
.set('config', config)
.use(express.static(pubdir))
.use(require('./lib/middleware/baconmail.js')(server))
.get('/api/items', function(req, res) {
  var page = parseInt(req.query.page)
    , pageSize = parseInt(req.query.pageSize)
    , emails = server.get('emails')
  if (!page === 0 && !page) return res.json('Must specify page param', 400)
  if (!pageSize) return res.json('Must specify pageSize param', 400)
  var response = []
    , start = page * pageSize
    , end = start + pageSize
  for (var id = start; id < end; id++) {
    var i = _relativeIndex(id, emails.length)
    response.push(_.extend({ id: id }, emails[i]))
  }
  res.json(response)
})
.get('/api/item/:id', function(req, res) {
  var emails = server.get('emails')
    , id = _relativeIndex(req.params.id, emails.length)
  if (email) res.json(_.extend({ id: id }, emails[id]))
  else res.json({ error: 'Email not found' }, 404)
})
.all('*', function(req, res) { res.sendfile(pubdir + '/index.html') })
.listen(config.PORT)