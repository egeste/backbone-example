define(function(require) {
  var Backbone = require('Backbone')
    , List = require('views/list')
    , Email = require('views/email')
    , Control = require('views/control')
    , loadingTemplate = '<div class="loading"/>'
    , emptyTemplate = '<div class="empty">No bacon :(</div>'
  return Backbone.View.extend({
    events: { 'click [data-header] a': '_home' }
    , initialize: function() {
      this.model.on('change:email', this.update, this)
      this.collection
        .on('sync', this.empty, this)
        .on('reset', this.update, this)
        .on('request', this.loading, this)
      this.createSubViews()
    }
    , createSubViews: function() {
      this.list = new List({
        model: this.model,
        collection: app.emails
      })
      this.control = new Control({ model: this.model })
    }
    , render: function() {
      this.$control = this.$('[data-control]')
      this.$content = this.$('[data-content]')
      this.list.setElement(this.$content).render()
      this.control.setElement(this.$control).render()
      return this.loading()
    }
    , update: function() {
      var email = this.model.get('email')
      if (!email) this.list.render()
      else new Email({ model: email, el: this.$content }).render()
      return this
    }
    , loading: function() {
      this.$content.html(loadingTemplate)
      return this
    }
    , empty: function() {
      if (!this.collection.length)
        this.$content.html(emptyTemplate)
      return this
    }
    , _home: function() {
      Backbone.history.navigate('/', { trigger: true })
    }
  })
})