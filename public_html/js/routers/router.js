var app = app || {};

app.Router = Backbone.Router.extend({

    routes: {
        "": "home",
        "about": "about",
        "logout": "logout"
    },

    initialize: function () {
        app.navbarView = new app.NavbarView({model: app.state});                
    },
    home: function () {
    },
    logout: function () {
    },
    about: function () {
    }

});
