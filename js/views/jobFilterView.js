class JobFilterView extends Backbone.View {

    initialize() {
        _.bindAll(this, 'render');
        this.template = _.template(require('../../templates/jobFilterView.html'));
        this.render();
    }

    render() {
        this.$el.html(this.template());
        return this;
    }

}

export default JobFilterView;
