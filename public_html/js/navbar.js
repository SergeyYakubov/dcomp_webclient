function render(tmpl_url, tmpl_data) {
    if ( !render.tmpl_cache ) { 
        render.tmpl_cache = {};
    }

    if ( ! render.tmpl_cache[tmpl_url] ) {

        var tmpl_string;
        $.ajax({
            url: tmpl_url,
            method: 'GET',
            dataType: 'html', //** Must add 
            async: false,
            success: function(data) {
                tmpl_string = data;
            }
        });

        render.tmpl_cache[tmpl_url] = _.template(tmpl_string);
    }

    return render.tmpl_cache[tmpl_url](tmpl_data);
}

(function($){
  var NavbarView = Backbone.View.extend({
    el: $('.navcontainer'), // attaches `this.el` to an existing element.

    initialize: function(){
      this.render()
    },
    
    render: function(){
        var rendered_html = render('templates/navbar.html', {});        
        this.$el.html(rendered_html);                  
        return this;
    },
  });
    
  var navbarView = new NavbarView();
  
})(jQuery);
