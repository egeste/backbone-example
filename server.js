var _ = require('underscore')
, express  = require('express')
, server = express()
, pubdir = __dirname + '/public'
, config = require(__dirname + '/config.json')

server
.set('config', config)
.use(express.static(pubdir))
.use(require('./lib/middleware/baconmail.js')(server))
.get('/api/items', function(req, res) { res.json(server.get('emails')) })
.get('/api/item/:id', function(req, res) {
  var email = server.get('emails')[req.params.id]
  if (email) res.json(server.get('emails')[req.params.id])
  else res.json({ error: 'Email not found' }, 404)
})
.all('*', function(req, res) { res.sendfile(pubdir + '/index.html') })
.listen(config.PORT)