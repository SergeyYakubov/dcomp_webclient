var app = app || {};

app.LoginForm = Backbone.View.extend({
    className: "modal fade",
    attributes: {
        tabindex: "-1",
        role: "dialog",
    },
    events: {
        'submit': 'submit',
        'hidden.bs.modal': 'close'
    },

    initialize: function () {
        _.bindAll(this, 'render', 'submit', 'show', 'close');
        this.render();
    },
    render: function () {
        this.$el.html(app.templates.get("login_form")({}));
        return this;
    },
    submit: function (e) {
        e.preventDefault();
        // console.log(this.$('#inputUser').val());
        //console.log(this.$('#inputPassword').val());
        var newstate = {
            logged: true,
            user: this.$('#inputUser').val(),
        };
        this.model.set(newstate);
        this.$el.modal('hide');
    },
    show: function () {
        this.$el.modal("show");
    },
    close: function () {
        this.$el.data('modal', null);
        this.remove();
    },

});

