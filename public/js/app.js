(function(w) {
  requirejs.config({
    // All of our custom stuff is going to be in js/
    baseUrl: '/js/'
    // Everything else is going to be loaded off a CDN (for now)
    , paths: {
      'jquery': 'https://cdnjs.cloudflare.com/ajax/libs/jquery/1.8.2/jquery.min'
      , 'Backbone': 'https://cdnjs.cloudflare.com/ajax/libs/backbone.js/0.9.10/backbone-min'
      , 'underscore': 'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min'
    }
    // Declare dependencies and exports
    , shim: {
      underscore: {
        exports: '_'
      }
      , Backbone: {
        deps: ['jquery', 'underscore']
        , exports: 'Backbone'
      }
    }
  })
  // Bootstrap the application
  require(['routers/index'], function(Index) {
    new Index({ exports: w })
  })
})(window)