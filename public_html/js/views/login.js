var app = app || {};

app.LoginView = Backbone.View.extend({
    events: {
        'click #loginButton': 'login',
    },

    initialize: function () {
        _.bindAll(this, 'render', 'login'); // every function that uses 'this' as the current object should be in here
        this.listenTo(this.model, 'change', this.render);
        this.render()
    },

    render: function () {
        this.$el.html(app.templates.get("login")(this.model.attributes));

        return this;
    },
    login: function () {
        if (this.model.get('logged')) {
            this.model.set({
                logged: false,
                user: ""
            });
        } else {
            var loginForm = new app.LoginForm({model: this.model});
            loginForm.show();
        }
    }
});

