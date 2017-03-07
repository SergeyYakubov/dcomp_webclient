var app = app || {};

app.LoginForm = Backbone.View.extend({
    className: "modal fade",
    attributes: {
        tabindex: "-1",
        role: "dialog",
    },
    events: {
        'submit': 'onSubmit',
        'hidden.bs.modal': 'onClose'
    },

    initialize: function () {
        _.bindAll(this, 'render', 'onSubmit', 'show', 'close','onClose',
        'loginFailed');
        this.listenTo(this.model, 'change:logged', this.close);
        this.listenTo(this.model, 'change:attempts', this.loginFailed);
        this.render();
    },
    render: function () {
        this.$el.html(app.templates.get("login_form")(this.model.attributes));
        return this;
    },
    onSubmit: function (e) {
        e.preventDefault();
        this.model.login(this.$('#inputUser').val(),this.$('#inputPassword').val());
    },
    show: function () {
        this.$el.modal("show");
    },
    close: function () {
        this.$el.modal("hide");
    },
    onClose: function () {
        this.model.set({'attempts':0});        
        this.$el.data('modal', null);
        this.remove();
    },
    loginFailed: function () {
        const attempts= this.model.get('attempts');
        if (attempts === 0) return; // login was successful, do nothing here
        this.render().$('[autofocus]').focus();
    },
    
});

