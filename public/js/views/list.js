define(function(require) {
  var Backbone = require('Backbone')
  , Email = require('views/email')
  return Backbone.View.extend({
    initialize: function() {
      this.model.on('change:view', this.updateView, this)
    }
    , render: function() {
      this.$title = $('<h1/>')
      this.$el.html(this.$title)
      this.collection.each(this.add, this)
      return this.updateView()
    }
    , updateView: function() {
      var view = this.model.get('view')
        , count = this.collection.length
        , title = view + ' View - ' + count + ' Items'
      this.$el.attr('class', 'multi').addClass(view.toLowerCase())
      this.$title.text(title)
      return this
    }
    , add: function(email) {
      var single = new Email({ model: email })
      single.$el.appendTo(this.el)
      single.render()
    }
  })
})