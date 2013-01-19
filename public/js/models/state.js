define(function(require) {
  var Backbone = require('Backbone')
  , _ = require('underscore')
  , VIEWS = ['list', 'gallery']
  return Backbone.Model.extend({
    defaults: { view: 'list' }
    , validate: function(attrs, options) {
      attrs = attrs || this.attrs
      if (!_.contains(VIEWS, attrs.view))
        return 'Invalid view state: ' + attrs.view
    }
  })
})