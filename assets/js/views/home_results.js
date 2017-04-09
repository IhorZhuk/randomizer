define(
  ['backbone', 'text!templates/home_results.html'], 
  function(Backbone, htmlTemplate) {

  var HomeResults = Backbone.View.extend({

    className: 'pill-result',

    template: _.template(htmlTemplate),

    initialize: function(ops) {
      this.model1 = ops.item1;
      this.model2 = ops.item2;
    },

    render: function() {
      var data = {
        title1: this.model1.get('title'),
        title2: this.model2.get('title'),
      };
      this.$el.html( this.template(data));
      return this.$el;
    }


  });

  return HomeResults;

});