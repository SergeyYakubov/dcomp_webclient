var app = app || {};

function render(tmpl_url, tmpl_data) {
    if (!render.tmpl_cache) {
        render.tmpl_cache = {};
    }

    if (!render.tmpl_cache[tmpl_url]) {

        var tmpl_string;
        $.ajax({
            url: tmpl_url,
            method: 'GET',
            dataType: 'html', //** Must add
            async: false,
            success: function (data) {
                tmpl_string = data;
            }
        });

        render.tmpl_cache[tmpl_url] = _.template(tmpl_string);
    }

    return render.tmpl_cache[tmpl_url](tmpl_data);
}


app.NavbarView = Backbone.View.extend({
    el: $('.navcontainer'), // attaches `this.el` to an existing element.

    initialize: function () {
        _.bindAll(this, 'render'); // every function that uses 'this' as the current object should be in here
        this.listenTo(this.model, 'change', this.render);
        this.render();
    },

    render: function () {
        if (app.state.get("logged")) {
            this.$el.html(app.templates.get("navbar")(""));
        } else {
            this.$el.html(app.templates.get("navbar_nologin")(""));
        }

        this.loginView = new app.LoginView({model: app.state});

        this.$('#login_container')
                .append(this.loginView.el);

        return this;
    },
});

