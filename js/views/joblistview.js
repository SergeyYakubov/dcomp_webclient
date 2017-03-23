import LeftMenuView from './leftmenuview';
import JobListActionsView from '../../js/views/joblist_actionsview';


class JobListView extends Backbone.View {

    get events() {
        return {
            'click #killjob': 'onKillJob',
            'click #removejob': 'onRemoveJob',
        }
    }

    get el() {
        return $('.maincontainer');
    }

    initialize() {
        _.bindAll(this, "render", "close", "onKillJob");
        this.template = _.template(require('../../templates/joblist.html'));
        this.subviews = [];
    }

    render() {
        this.$el.html(this.template({}));

        this.appendSubView(new LeftMenuView(), "left-menu");
        this.appendSubView(new LeftMenuView(), "job-filter");
        this.appendSubView(new LeftMenuView(), "job-list");
        this.appendSubView(new JobListActionsView(), "actions-panel");

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

    onKillJob() {
    }

    onRemoveJob() {
    }

}

export default JobListView;

