import Backbone from 'backbone';
import LoginView from './login';
import _ from "underscore";

class NavbarView extends Backbone.View {

    get el() {
        return $('.navcontainer');
    }

    initialize() {
        _.bindAll(this, 'render'); // every function that uses 'this' as the current object should be in here
        this.listenTo(this.model, 'change:logged', this.render);
        this.templateLogged = _.template(require('../../templates/navbar.html'));
        this.templateUnlogged = _.template(require('../../templates/navbar_nologin.html'));        
        this.render();
    }

    render() {
        if (app.state.get("logged")) {
            this.$el.html(this.templateLogged(""));
        } else {
            this.$el.html(this.templateUnlogged(""));
        }

        this.loginView = new LoginView({model: app.state});
        
        this.$('#login_container').append(this.loginView.el);
        return this;
    }

}

export default NavbarView;

