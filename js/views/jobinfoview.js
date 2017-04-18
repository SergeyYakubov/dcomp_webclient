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
            "click .my_checkbox": "onCheckboxAreaClick",
            "click :input[type=checkbox]": "onCheckboxClick",
        }
    }

    initialize() {
        _.bindAll(this, "render", "onClick",
                "onCheckboxAreaClick", "onCheckboxClick");
        this.listenTo(this.model, 'change', this.render);
        this.template = _.template(require('../../templates/jobinfo.html'));
        this.firstRender = true;
    }

    onCheckboxClick(event) {
        event.stopPropagation();
    }

    onCheckboxAreaClick(event) {
        event.stopPropagation();
        const cb = this.$('input[type=checkbox]');
        cb.prop("checked", !cb.is(":checked"));
    }

    setSelected(select) {
        const cb = this.$('input[type=checkbox]');
        cb.prop("checked", select);
    }

    isSelected() {
        const cb = this.$('input[type=checkbox]');
        return cb.is(":checked");
    }

    onClick() {
        this.$("button").blur();
    }

    render() {
        const ID = this.model.get("JobName") || "... " + this.model.get("Id").slice(-3);

        const newElement = $(this.template(_.extend(this.model.attributes,
                {ID: ID})));

        if (this.firstRender) {
            this.setElement(newElement);
        }

        this.$el.html(newElement.html());

        this.firstRender = false;
        return this;
    }
}

export default JobInfoView;

