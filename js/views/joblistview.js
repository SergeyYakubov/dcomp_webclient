import LeftMenuView from './leftmenuview';
import JobListActionsView from './joblist_actionsview';
import JobInfoListView from "./jobinfolistview";
import JobFilterView from './jobFilterView.js';
import JobFilter from '../models/jobFilter.js';



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
        const filter = new JobFilter();

        this.appendSubView(new JobFilterView({model: filter}), "job-filter");
        
        this.jobInfoListView = new JobInfoListView({model: filter});
        this.appendSubView(this.jobInfoListView, "job-list");
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
        this.jobInfoListView.sendStopCommandForSelectedJobs();
    }

    onRemoveJob() {
        this.jobInfoListView.sendRemoveCommandForSelectedJobs();
    }

}

export default JobListView;

