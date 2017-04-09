define(['backbone'], function(Backbone) {

  var SetItemModel = Backbone.Model.extend({

    validate: function( attrs, ops) {
      if (attrs.title == '') {
        return 'Title is blank';
      }
    }
  });

  return SetItemModel;

});