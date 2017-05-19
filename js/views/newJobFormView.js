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
            'click #newJobSubmit': 'onClickSubmit',
            'click #newJobPrev': 'onClickPrev',
            'click #newJobNext': 'onClickNext',
            'hidden.bs.modal': 'onClose',
            "click": "onClick",

        }
    }

    onClickPrev() {
        const index = this.$('button.active').parent().index() - 1;
        if (index < 0)
            return;
        const el = this.$('#stepsList li')[index];
        $("button", el).click();

    }

    onClickNext() {
        const index = this.$('button.active').parent().index() + 1;
        const size= this.$('#stepsList li').length
        if (index > size-1)
            return;
        const el = this.$('#stepsList li')[index];
        $("button", el).click();

    }

    onClick() {
        this.$("button").blur();
    }

    initialize() {
        _.bindAll(this, 'render', 'show', 'close', 'onClose');
        this.template = _.template(require('../../templates/newJob_form.html'));
        this.render();
    }

    render() {
        this.$el.html(this.template());
        return this;
    }

    onClickSubmit() {
        //this.$el.modal("hide");

    }

    show() {
        this.$el.modal({
            backdrop: 'static', // This disable for click outside event
            keyboard: false, // This for keyboard event
        }, "show");
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

