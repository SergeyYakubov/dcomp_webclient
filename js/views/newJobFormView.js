import 'bootstrap';

class NewJobForm extends Backbone.View {

    get className() {
        return "modal fade";
    }

    get attributes() {
        return {
            tabindex: "-1",
            role: "dialog",
        };
    }

    get events() {
        return  {
            'submit': 'onSubmit',
            'hidden.bs.modal': 'onClose'
        }
    }

    initialize() {
        _.bindAll(this, 'render', 'onSubmit', 'show', 'close', 'onClose');
        this.template = _.template(require('../../templates/newJob_form.html'));
        this.render();
    }

    render() {
        this.$el.html(this.template());
        return this;
    }

    onSubmit(e) {
        e.preventDefault();
    }

    show() {
        this.$el.modal("show");
    }

    close() {
        this.$el.modal("hide");
    }

    onClose() {
        this.$el.data('modal', null);
        this.remove();
    }

}

export default NewJobForm;

