var app = app || {};

app.Router = Backbone.Router.extend({
    routes: {
        "": "home",
        "about": "about",
    },

    initialize: function () {
        app.navbarView = new app.NavbarView({model: app.state});
        this.listenTo(app.state, "change:logged", this.processLoginStateChanged);
    },
    processLoginStateChanged: function () {
    },
    home: function () {
    },
    about: function () {
    }

});
