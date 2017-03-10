import Backbone from 'backbone';
import LoginForm from './loginform';
import _ from "underscore";

class LoginView extends Backbone.View {
    get events() {
        return {
            'click #loginButton': 'login',
        }
    }

    initialize() {
        _.bindAll(this, 'render', 'login'); // every function that uses 'this' as the current object should be in here
        this.listenTo(this.model, 'change:logged', this.render);
        this.template = _.template(require('../../templates/login.html'));
        this.render()
    }

    render() {
        this.$el.html(this.template(this.model.attributes));
        return this;
    }

    login() {
        if (this.model.get('logged')) {
            this.model.logout();
        } else {
            const loginForm = new LoginForm({model: this.model});
            loginForm.show();
        }
    }
}

export default LoginView;

