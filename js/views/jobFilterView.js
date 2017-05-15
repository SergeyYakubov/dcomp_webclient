import "../../node_modules/jquery-ui-css/jquery-ui.min.js";


class JobFilterView extends Backbone.View {

    initialize() {
        _.bindAll(this, 'render');
        this.template = _.template(require('../../templates/jobFilterView.html'));
        this.listenTo(this.model, 'change', this.render);
        this.render();
    }

    get events() {
        return  {
            'submit': 'onSubmit',
        }
    }

    onSubmit(e) {

        const keyword = this.$('#filterKeyword').val();
        const optionsDate = this.$('input[name=optionsDate]:checked').val();
        let from = "";
        let to = "";
        let last = "";
        let finishedOnly = false;
        let notFinishedOnly = false;

        if (optionsDate == "periodLast") {
            last = this.$('#last option:selected').val();
        } else {
            from = this.$('#from').val();
            to = this.$('#to').val();
        }

        const optionsStatus = this.$('input[name=optionsStatus]:checked').val();

        if (optionsStatus == "statusFinished") {
            finishedOnly = true;
        } else if (optionsStatus == "statusNotFinished") {
            notFinishedOnly = true;
        }
        console.log(from, to)

        this.model.set({
            from: from,
            to: to,
            last: last,
            keyword: keyword,
            finishedOnly: finishedOnly,
            notFinishedOnly: notFinishedOnly,
        });
        e.preventDefault();

    }

    render() {
        this.$el.html(this.template(this.model.attributes));
        this.$("#from").datepicker({ dateFormat: 'yy-mm-dd' });
        this.$("#to").datepicker({ dateFormat: 'yy-mm-dd' });
        return this;
    }

}

export default JobFilterView;
