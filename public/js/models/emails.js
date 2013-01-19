define(function(require) {
  var Backbone = require('Backbone')
  	, Email = require('models/email')
  return Backbone.Collection.extend({
  	url: '/api/items'
  , model: Email
  })
})