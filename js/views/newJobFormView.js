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
            "submit": "onSubmit",
            'hide.bs.tab': "onChangeStep",
        }
    }

    checkAllForms() {
        for (let i = 0; i < this.numSteps; i++) {
            if (!this.checkForm(i, false)) {
                const el = this.$('#stepsList li')[i];
                $("button", el).click();
                this.checkForm(i, true);
                return false;
            }
        }
        return true;
    }

    checkForm(index, showError) {
        const id = "#step" + (index + 1);
        const form = this.$(id)[0];
        if (!form.checkValidity()) {
            if (showError) {
                $('<input type="submit">').hide().appendTo(form).click().remove();
            }
            return false;
        }
        return true;

    }

    getCurrentStep() {
        return this.$('button.active').parent().index();
    }

    onChangeStep(e) {
        const index = this.getCurrentStep();
        if (!this.checkForm(index, true)) {
            e.preventDefault();
            return;
        }

    }

    onClickPrev() {
        const index = this.getCurrentStep();
        if (!this.checkForm(index, true)) {
            return;
        }

        if (index < 1)
            return;
        const el = this.$('#stepsList li')[index - 1];
        $("button", el).click();

    }

    onClickNext() {
        const index = this.getCurrentStep();
        if (!this.checkForm(index)) {
            return;
        }

        const size = this.$('#stepsList li').length;
        if (index > size - 2)
            return;
        const el = this.$('#stepsList li')[index + 1];
        $("button", el).click();

    }

    onClick() {
        this.$("button").blur();
    }

    initialize() {
        _.bindAll(this, 'render', 'show', 'close', 'onClose');
        const s = require('../../templates/newJob_form.html');

        this.applicationForm_template = _.template(require('../../templates/newJob_form_application.html'));
        this.dataForm_template = _.template(require('../../templates/newJob_form_data.html'));
        this.resourcesForm_template = _.template(require('../../templates/newJob_form_resources.html'));


        this.template = _.template(require('../../templates/newJob_form.html'));
        this.render();

        this.numSteps = 3;
    }

    render() {
        this.$el.html(this.template({
            applicationForm: this.applicationForm_template(),
            dataForm: this.dataForm_template(),
            resourcesForm: this.resourcesForm_template(),
        }));
        return this;
    }

    onSubmit(e) {
        e.preventDefault();
    }

    onClickSubmit() {
        if (!this.checkAllForms()) {
            return;
        }
        this.updateModel();

        this.model.submitToServer(function (res) {
            if (res == "") {
                this.$el.modal("hide");
            } else {
                alert("Cannot submit job: " + res);
            }
        }.bind(this));
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

    updateModel() {
        this.model.set({
            "ImageName": this.$('#imageName').val(),
            "Script": this.$('#script').val(),
            "NCPUs": parseInt(this.$('#jobNCPUs').val()),
            "NNodes": parseInt(this.$('#jobNNodes').val()),
            "JobName": this.$('#jobName').val(),
            "Resource": this.$('#jobResource').val(),
        });
    }
}

export default NewJobForm;

