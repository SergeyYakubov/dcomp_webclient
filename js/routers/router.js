import NavbarView from '../views/navbar';


class Router extends Backbone.Router {
    get routes() {
        return {
            "": "home",
            "about": "about",
        };
    }

    initialize() {
        app.navbarView = new NavbarView({model: app.state});
        this.listenTo(app.state, "change:logged", this.processLoginStateChanged);
    }

    processLoginStateChanged() {
    }

    home() {
    }

    about() {
    }

}

export default Router;
