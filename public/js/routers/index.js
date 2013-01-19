define(function(require) {
  var Backbone = require('Backbone')
  , Email = require('models/email')
  , Emails = require('models/emails')
  , State = require('models/state')

  return Backbone.Router.extend({
    routes: {
      'email/:id': 'single'
      , '*splat': 'index'
    }
    , initialize: function(options) {
      options.exports.app = this
      this.configureModels()
      this.createSubViews()
      this.emails.fetch()
      Backbone.history.start({ pushState: true })
    }
    , configureModels: function() {
      this.state = new State
      this.emails = new Emails
    }
    , createSubViews: function() {
      var Layout = require('views/layout')
      this.layout = new Layout({
        el: $('body')
        , model: this.state
        , collection: this.emails
      }).render()
    }
    , index: function(route) {
      this.state.unset('email')
      if (route === '') route = 'list'
      this.state.set('view', route, { validate: true })
    }
    , single: function(id) {
      var email = this.emails.get(id)
      if (!email) {
        email = new Email({ id: id })
        email.on('error', this.layout._home, this)
        email.fetch()
      }
      this.state.set('email', email)
    }
  })
})