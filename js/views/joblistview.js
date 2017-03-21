import LoginView from './login';

class JobListView extends Backbone.View {

    get el() {
        return $('.maincontainer');
    }

    initialize() {
        _.bindAll(this, "render", "close");
        this.template = _.template(require('../../templates/joblist.html'));
        this.subviews = [];
    }

    render() {
        this.$el.html(this.template({}));

        this.appendSubView(new LoginView({"model": app.state}), "actions-panel");
        this.appendSubView(new LoginView({"model": app.state}), "left-menu");
        this.appendSubView(new LoginView({"model": app.state}), "job-filter");
        this.appendSubView(new LoginView({"model": app.state}), "job-list");

        return this;
    }

    appendSubView(view, elementName) {
        this.$("#" + elementName).append(view.el);
        this.subviews.push(view);
    }

    removeSubViews() {
        for (let i = 0; i < this.subviews.length; i++) {
            this.subviews[i].remove();
            
        }
        this.subviews.length=0;
    }

    close() {
        this.removeSubViews();
// we don't call remove as this would delete .maincontainer element
        this.$el.empty().off(); /* off to unbind the events */
        this.stopListening();
    }

}

export default JobListView;

