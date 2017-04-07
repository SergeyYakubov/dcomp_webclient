import JobInfo from '../models/job';
import 'bootstrap';

class JobInfoViewExtended extends Backbone.View {

    get events() {
        return {
            "hidden.bs.collapse": "onCollapse",
            "shown.bs.collapse": "onExpand",
        }
    }

    initialize() {
        _.bindAll(this, "render", "onCollapse", "onExpand");
        this.listenTo(this.model, 'change', this.render);
        this.template = _.template(require('../../templates/jobinfo_expanded.html'));
        this.firstRender = true;
        this.collapsed = true;
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

