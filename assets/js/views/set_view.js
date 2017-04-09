define(
  ['backbone', 'text!templates/setview.html', 'views/set_item_view'],
  function(Backbone, htmlTemplate, ItemView) {

    var SetView = Backbone.View.extend({
      
      template: _.template(htmlTemplate),

      events: {
        'submit form': 'addItem'
      },

      initialize: function(ops) {
        this.collection = ops.collection;
        this.listenTo(this.collection, 'update', this.onCollectionChange);
        this.listenTo(this.collection, 'reset', this.onCollectionReset)
      },

      setUI: function() {
        var $el = this.$el;
        this.ui = {
          $title: $el.find('.title-input'),
          $childRegion: $el.find('.js-children-region')
        };
      },

      onCollectionChange: function() {
        this.renderChildViews();
      },

      onCollectionReset: function() {
        this.ui.$title.val('');
        this.ui.$childRegion.html('');
      },

      addItem: function(e) {
        e.preventDefault();
        var title = this.ui.$title.val();
        this.ui.$title.val('');
        this.collection.add({title: title}, { validate: true});
      },

      renderChildViews: function() {
        var $wrapper = this.ui.$childRegion;
        $wrapper.html('');
        this.collection.each(function(model) {
          var view = new ItemView({model: model});
          $wrapper.append(view.render());
        });
      },

      render: function() {
        this.$el.html( this.template());
        this.setUI();
        // this.renderChildViews();
        return this.$el;
      }

    });

    return SetView;
  }
);