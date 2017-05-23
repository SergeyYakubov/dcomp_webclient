import NewJobForm from './newJobFormView';
import JobInfo from '../models/job';

class LeftMenuView extends Backbone.View {

    initialize() {
        _.bindAll(this, 'render');
        this.template = _.template(require('../../templates/leftmenu.html'));
        this.render();
    }

    get events() {
        return {
            "click #newJob": "onNewJobClick",
            "click": "onClick",
        }
    }

    onClick() {
        this.$("button").blur();
    }

    onNewJobClick() {
        const job = new JobInfo();
        this.newJobForm = new NewJobForm({model:job});
        this.newJobForm.show();
    }
    render() {
        this.$el.html(this.template({}));
        return this;
    }

}

export default LeftMenuView;
