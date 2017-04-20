import JobInfo from '../models/job';
import JobFiles from '../models/jobFiles';

import 'bootstrap';


class JobInfoViewExtended extends Backbone.View {

    get events() {
        return {
            "hidden.bs.collapse": "onCollapse",
            "shown.bs.collapse": "onExpand",
            "click .joblink": "onJobFilesClick",

        }
    }

    initialize() {
        _.bindAll(this, "render", "onCollapse", "onExpand", "onJobFilesClick");
        this.listenTo(this.model, 'change', this.render);
        this.template = _.template(require('../../templates/jobinfo_expanded.html'));
        this.firstRender = true;
        this.collapsed = true;
    }

    onJobFilesClick() {
        const jobfiles = new JobFiles({Id: this.model.get("Id")});
        jobfiles.sync();
    }

    onCollapse() {
        this.collapsed = true;
        this.parentView.updateExpanded();
    }

    onExpand() {
        this.collapsed = false;
        this.parentView.updateExpanded();
    }

    render() {
        const ID = this.model.get("JobName") || "... " + this.model.get("Id").slice(-3);

        const expandedElement = $(this.template(_.extend(this.model.attributes,
                {collapsed: this.collapsed,
                    ID: ID})));

        if (this.firstRender) {
            this.setElement(expandedElement);

        }

        this.$el.html(expandedElement.html());


        this.firstRender = false;
        return this;
    }
}

export default JobInfoViewExtended;

