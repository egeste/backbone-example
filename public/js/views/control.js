define(function(require) {
  var Backbone = require('Backbone')
  return Backbone.View.extend({
    events: { 'click .control': '_update' }
    , _update: function(e) {
      var view = $(e.target).data('view')
      Backbone.history.navigate('/'+view, { trigger: true })
    }
  })
})