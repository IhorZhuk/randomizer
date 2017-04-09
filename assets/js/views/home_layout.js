define(
  ['backbone', 
  'text!templates/home_layout.html', 
  'views/set_view',
  'collections/set',
  'views/home_results'], 
  function(Backbone, htmlTemplate, SetView, Set1Collection, ResultsView) {

  var HomeLayout = Backbone.View.extend({

    el: '.js-region-root',

    template: _.template(htmlTemplate),

    events: {
      'click .js-match': 'matchSets',
      'click .js-reset': 'resetCollections'
    },

    initialize: function() {
      this.set1 = new Set1Collection();
      this.set2 = new Set1Collection();

      this.listenTo(this.set1, 'update', this.onCollectionsUpdate);
      this.listenTo(this.set2, 'update', this.onCollectionsUpdate);
      this.listenTo(this.set1, 'reset',  this.onCollectionsReset);
      this.listenTo(this.set2, 'reset',  this.onCollectionsReset);
    },

    setUI: function() {
      this.ui = {
        $set1: $('.js-set-1'),
        $set2: $('.js-set-2'),
        $btnMatch: $('.js-match'),
        $btnReset: $('.js-reset'),
        $results: $('.js-results')
      };
    },

    onCollectionsUpdate: function() {
      this.toggleButtonState();
    },

    onCollectionsReset: function() {
      this.toggleButtonState();
      if ( typeof this.resultsView != 'undefined' ) {
        this.resultsView.remove();
      }
    },

    toggleButtonState: function() {
      if ( this.set1.length != 0 && this.set2.length != 0) {
        this.ui.$btnMatch.prop('disabled', false);
      } else {
        this.ui.$btnMatch.prop('disabled', true);
      }
    },

    matchSets: function(e) {
      e.preventDefault();
      set1RandomModel = _.sample(this.set1.models);
      set2RandomModel = _.sample(this.set2.models);

      this.set1.remove(set1RandomModel);
      this.set2.remove(set2RandomModel);

      this.resultsView = new ResultsView({item1:set1RandomModel, item2: set2RandomModel});
      this.ui.$results.append(this.resultsView.render());
    },

    resetCollections: function(e) {
      e.preventDefault();
      this.set1.reset();
      this.set2.reset();
    },

    render: function() {
      this.$el.html( this.template() );

      this.setUI();
      this.renderSet1();
      this.renderSet2();
      this.toggleButtonState();
      return this.$el;
    },

    renderSet1: function() {
      var view = new SetView({collection: this.set1});
      this.ui.$set1.html( view.render() );
    },

    renderSet2: function() {
      var view = new SetView({collection: this.set2});
      this.ui.$set2.html( view.render() );
    }

  });

  return HomeLayout;

});