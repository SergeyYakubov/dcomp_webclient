import JobInfo from '../models/job';
import 'bootstrap';

class JobInfoView extends Backbone.View {

    /*    get className() {
     return "list-group-item list-group-item-action";
     }
     
     get tagName() {
     return "li";
     }
     */
    get events() {
        return {
            "click": "onClick",
            "hidden.bs.collapse": "onCollapse",
            "shown.bs.collapse": "onExpand",
        }
    }

    initialize() {
        _.bindAll(this, "render", "onClick", "onCollapse", "onExpand");
        this.listenTo(this.model, 'change', this.render);
        this.template = _.template(require('../../templates/jobinfo.html'));
        this.collapsed = false;
    }

    onClick() {
        this.$("button").blur();
    }

    onCollapse() {
        this.collapsed = true;
    }

    onExpand() {
        this.collapsed = false;
    }
    
    render() {
        const html = this.template(_.extend(this.model.attributes, {collapsed: this.collapsed}));
        this.$el.html(html);
        return this;
    }
}

export default JobInfoView;

