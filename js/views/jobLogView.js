class JobLogView extends Backbone.View {
    get el() {
        return $('.maincontainer');
    }

    initialize() {
        _.bindAll(this, 'render');
        this.template = _.template(require('../../templates/jobLogView.html'));
        this.listenTo(this.model, 'change', this.render);
        this.model.sync();
    }

    render() {
        this.$el.html(this.template(this.model.attributes));
        return this;
    }

    close() {
// we don't call remove as this would delete .maincontainer element
        this.$el.empty().off(); /* off to unbind the events */
        this.stopListening();
    }

}

export default JobLogView;
