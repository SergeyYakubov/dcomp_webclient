var app = app || {};

app.LoginView = Backbone.View.extend({
    id: 'loginButton', // attaches `this.el` to an existing element.
    events: {
        'click': 'login',
    },

    initialize: function () {


        _.bindAll(this, 'render', 'login'); // every function that uses 'this' as the current object should be in here

        this.model.bind('change', this.render);
        this.render()
    },

    render: function () {
        this.$el.html(app.templates.get("login")(this.model.attributes));

        return this;
    },
    login: function () {

        if (!this.model.get('logged')) {
            var loginForm = new app.LoginForm({});
            loginForm.show();
        }

        var newstate = {
            logged: !this.model.get('logged'),
        };
        this.model.set(newstate);

        path = this.model.get('logged') ? '' : '/logout';
        app.router.navigate(path, {trigger: true, replace: true});
    }
});

