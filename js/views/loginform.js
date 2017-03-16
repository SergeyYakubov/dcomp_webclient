import 'bootstrap';

class LoginForm extends Backbone.View {

    get className() {
        return "modal fade";
    }

    get attributes() {
        return {
            tabindex: "-1",
            role: "dialog",
        };
    }

    get events() {
        return  {
            'submit': 'onSubmit',
            'hidden.bs.modal': 'onClose'
        }
    }

    initialize() {
        _.bindAll(this, 'render', 'onSubmit', 'show', 'close', 'onClose',
                'onloginAttempt');
        this.listenTo(this.model, 'change:logged', this.close);
        this.listenTo(this.model, 'change:attempts', this.onloginAttempt);
        this.template = _.template(require('../../templates/login_form.html'));
        this.render();
    }

    render() {
        this.$el.html(this.template(this.model.attributes));
        return this;
    }

    onSubmit(e) {
        e.preventDefault();
        this.model.login(this.$('#inputUser').val(), this.$('#inputPassword').val());
    }

    show() {
        this.$el.modal("show");
    }

    close() {
        this.$el.modal("hide");
    }

    onClose() {
        this.model.set({'attempts': 0});
        this.$el.data('modal', null);
        this.remove();
    }

    onloginAttempt() {
        const attempts = this.model.get('attempts');
        if (attempts === 0)
            return; // login was successful, do nothing here
        this.render().$('[autofocus]').focus();
    }
}

export default LoginForm;

