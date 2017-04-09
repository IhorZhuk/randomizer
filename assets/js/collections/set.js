define(['backbone', 'models/set_item'], function(Backbone, SetItem){

  var Set = Backbone.Collection.extend({
    model: SetItem
  });

  return Set;

});