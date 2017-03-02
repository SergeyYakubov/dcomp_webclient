var app = app || {};

app.LoginForm = Backbone.View.extend({
    className: "modal fade",
    attributes: {
        tabindex: "-1",
        role: "dialog",
    },
    events: {
        'click .btn': 'submit',
    },

    initialize: function () {
        _.bindAll(this, 'render', 'submit', 'show');
        this.render();
    },
    callback: function (eventType) {
        console.log("event type was " + eventType);
    },
    render: function () {
        this.$el.html(app.templates.get("login_form")({}));
        return this;
    },
    submit: function () {
        console.log("hahaha");
        //this.hideModal();
    },
    show: function () {
        this.$el.modal("show");
    },

});

