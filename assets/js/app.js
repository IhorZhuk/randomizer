require.config({
  paths: {
    text: 'vendor/require-text',
    jquery: 'vendor/jquery.min',
    backbone: 'vendor/backbone.min',
    underscore: 'vendor/underscore.min'
  },
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    }
  }
});

require(
  [
    'jquery',
    'underscore',
    'backbone',
    'views/home_layout'
  ],
  function($, _, Backbone, HomeLayout) {
    var view = new HomeLayout();
    view.render();
  }
);