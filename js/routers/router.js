import LoginState from '../models/loginState';
import NavbarView from '../views/navbar';
import JobListView from '../views/joblistview';
import JobLogView from '../views/jobLogView';
import JobLog from '../models/jobLog';



class Router extends Backbone.Router {
    get routes() {
        return {
            "": "navigateStateBased",
            "jobs": "jobs",
            "about": "about",
            "logs/:id": "joblog",
        };
    }

    initialize() {
        app.state = new LoginState();
        app.state.loginWithSavedToken();
        app.navbarView = new NavbarView({model: app.state});
        this.listenTo(app.state, "change:logged", this.navigateStateBased);
    }

    navigateStateBased() {
        if (app.state.get("logged")) {
            this.navigate("jobs", {trigger: true, replace: true});
        } else {
            this.navigate("about", {trigger: true, replace: true});
        }
    }

    jobs() {
        app.navbarView.selectMenuItem("jobs-menu");
        const view = new JobListView();
        this.render(view);
    }

    about() {
        app.navbarView.selectMenuItem("about-menu");
        this.render(null);
    }

    joblog(id) {
        const log = new JobLog();
        log.set({Id: id});

        const view = new JobLogView({model: log});
        this.render(view);
    }

    render(view) {

        if (this.currentView) {
            this.currentView.close();
        }

        if (view) {
            view.render();
        }

        this.currentView = view;

        return this;
    }
}

export default Router;
