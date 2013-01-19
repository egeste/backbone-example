define(function(require) {
  var Backbone = require('Backbone')
  , template = '\
  <h2 class="subject"><a href="javascript:void(0);"/></h2>\
  <h3 class="address"><a/></h3>\
  <p class="body"/>\
  '
  return Backbone.View.extend({
  	events: { 'click .subject a': '_open' }
    , className: 'email'
    , initialize: function() {
      this.model
        .on('change:subject', this.updateSubject, this)
        .on('change:address', this.updateAddress, this)
        .on('change:body', this.updateBody, this)
    }
  	, render: function() {
  		this.$el.attr('class', this.className).html(template)
      this.$subject = this.$('.subject a')
      this.$address = this.$('.address a')
      this.$body = this.$('.body')
      return this
        .updateSubject()
        .updateAddress()
        .updateBody()
  	}
    , updateSubject: function() {
      this.$subject.text(this.model.get('subject'))
      return this
    }
    , updateAddress: function() {
      this.$address
        .text(this.model.get('email'))
        .attr('href', 'mailto:'+this.model.escape('email'))
      return this
    }
    , updateBody: function() {
      this.$body.text(this.model.get('body'))
      return this
    }
    , _open: function() {
      Backbone.history.navigate('/email/'+this.model.id, { trigger: true })
    }
  })
})