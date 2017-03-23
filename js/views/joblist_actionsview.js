class JobListActionsView extends Backbone.View {

    initialize() {
        _.bindAll(this, 'render' );
        this.template = _.template(require('../../templates/joblist_actions.html'));
        this.render();
    }

    render() {
        this.$el.html(this.template({}));
        return this;
    }

}

export default JobListActionsView;
