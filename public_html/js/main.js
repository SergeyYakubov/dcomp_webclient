(function($){
 
  var LoginState = Backbone.Model.extend({
    defaults: {
      logged: false
    }
  });
  
  var state = new LoginState();
  state.set({
       logged: false
  });
 
  var LoginView = Backbone.View.extend({
    el: $('#loginButton'), // attaches `this.el` to an existing element.
    events: {
      'click':  'login',
    },

    initialize: function(){
        
        
      _.bindAll(this, 'render', 'login'); // every function that uses 'this' as the current object should be in here

      this.model.bind('change', this.render);
      this.render()
    },
    
    render: function(){
      str=this.model.get('logged')?'logout':'login';
      
      //console.Log(this.$el.toString())     
      
      
      $(this.el).text(str)

      return this;
    },
    login: function(){
      var newstate = {
        logged: !this.model.get('logged'),
      };
      this.model.set(newstate);
    },
  });
    
  // **listView instance**: Instantiate main app view.
  var loginView = new LoginView({model:state});
})(jQuery);
