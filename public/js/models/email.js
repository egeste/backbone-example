define(function(require) {
  var Backbone = require('Backbone')
  return Backbone.Model.extend({
    urlRoot: '/api/item'
  })
})