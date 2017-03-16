import LoginView from './login';

class NavbarView extends Backbone.View {

    get el() {
        return $('.navcontainer');
    }

    initialize() {
        _.bindAll(this, 'render'); // every function that uses 'this' as the current object should be in here
        this.listenTo(this.model, 'change:logged', this.render);
        this.template = _.template(require('../../templates/navbar.html'));
        this.render();
    }

    render() {
        this.$el.html(this.template(app.state.attributes));

        this.loginView = new LoginView({model: app.state});

        this.$('#login_container').append(this.loginView.el);
        return this;
    }
    
    selectMenuItem(menuItem) {
        $('.nav-item').removeClass('active');
        if (menuItem) {
            $('.' + menuItem).addClass('active');
        }
    }
}

export default NavbarView;

