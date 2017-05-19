import NewJobForm from './newJobFormView';

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
        this.newJobForm = new NewJobForm();
        this.newJobForm.show();
    }
    render() {
        this.$el.html(this.template({}));
        return this;
    }

}

export default LeftMenuView;
