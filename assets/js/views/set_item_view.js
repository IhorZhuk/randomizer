define(['backbone'], function(Backbone) {

  var SetItemView = Backbone.View.extend({

    tagName: 'span',
    className: 'pill',

    template: _.template('<%= title %>'),

    events: {
      'click': 'deleteItem'
    },

    deleteItem: function() {
      this.model.destroy();
      this.$el.remove();
    },

    render: function() {
      this.$el.html( this.template(this.model.toJSON()));
      return this.$el;
    }

  });

  return SetItemView;
});