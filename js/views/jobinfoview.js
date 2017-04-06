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
            "click .my_checkbox": "onCheckbox",
            "hidden.bs.collapse": "onCollapse",
            "shown.bs.collapse": "onExpand",
        }
    }

    initialize() {
        _.bindAll(this, "render", "onClick", "onCollapse", "onExpand", "onCheckbox");
        this.listenTo(this.model, 'change', this.render);
        this.template = _.template(require('../../templates/jobinfo.html'));
        this.collapsed = false;
    }

    onCheckbox(event) {
        const cb = this.$('input[type=checkbox]');
        cb.attr("checked", !cb.attr("checked"));
        event.stopPropagation();
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
        const shortId = this.model.get("Id").slice(-3);
        const html = this.template(_.extend(this.model.attributes,
                {collapsed: this.collapsed,
                    shortId: shortId}));
        const newElement = $(html);
        const hiddenElement = newElement.next();
        this.extendedView = new Backbone.View({el: hiddenElement});

        this.$el.replaceWith(newElement);
        this.setElement(newElement);
        return this;
    }
}

export default JobInfoView;

