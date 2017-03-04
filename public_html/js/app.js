var app = app || {};

function loadTemplate(views, callback) {

    var deferreds = [];
    app.templates = new Map();
    $.each(views, function (index, view) {
        deferreds.push($.get('templates/' + view + '.html', function (data) {
            app.templates.set(view, _.template(data));
        }));
    });

    $.when.apply(null, deferreds).done(callback);
}

app.state = new app.LoginState({
    logged: false
});


(function ($) {

    loadTemplate(['navbar', 'navbar_nologin', 'login_form', 'login'], function () {

        app.router = new app.Router();
        Backbone.history.start();
    });


})(jQuery);
