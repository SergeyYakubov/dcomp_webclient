import LeftMenuView from './leftmenuview';

class NewJobView extends Backbone.View {

    get el() {
        return $('.maincontainer');
    }

    initialize() {
        _.bindAll(this, "render", "close");
        this.template = _.template(require('../../templates/newJobView.html'));
        this.subviews = [];
    }

    render() {
        this.$el.html(this.template({}));

        this.appendSubView(new LeftMenuView(), "left-menu");
        this.appendSubView(new LeftMenuView(), "job-form");
        this.appendSubView(new LeftMenuView(), "actions-panel");

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
        this.subviews.length = 0;
    }

    close() {
        this.removeSubViews();
// we don't call remove as this would delete .maincontainer element
        this.$el.empty().off(); /* off to unbind the events */
        this.stopListening();
    }


}

export default NewJobView;

