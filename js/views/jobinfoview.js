import JobInfo from '../models/job';

class JobInfoView extends Backbone.View {

    get className() {
        return "list-group-item list-group-item-action";
    }

    get tagName() {
        return "li";
    }

    get events() {
        return {
            "click": "onClick"
        }
    }

    initialize() {
        _.bindAll(this, "render","onClick");
        this.template = _.template(require('../../templates/jobinfo.html'));
        this.expand = false;
    }

    onClick() {
        this.expand = !this.expand;
        this.render();
    }

    render() {
        this.$el.html(this.template(_.extend(this.model.attributes, {full: this.expand})));
        return this;
    }

}

export default JobInfoView;

