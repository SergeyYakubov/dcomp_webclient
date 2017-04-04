import JobInfo from "../models/job";
import JobInfos from "../collections/jobs";
import JobInfoView from '../../js/views/jobinfoview';
class JobInfoListView extends Backbone.View {

    initialize() {
        _.bindAll(this, "render", "updateJobs");
        this.template = _.template(require('../../templates/jobinfolist.html'));
        this.jobs = new JobInfos();
        this.listenTo(this.jobs, 'reset', this.render);
        this.subviews = [];
        this.updateJobs();
    }

    clearJobs() {
        for (let i = 0; i < this.subviews.length; i++) {
            this.subviews[i].remove();
        }
        this.subviews.length = 0;
    }

    updateJobs() {
        this.jobs.fetch({
            reset: true,
            data: {finished:true},
            headers: {'Authorization': app.state.get("token")},
            success: function () {
                this.loginTimer = setTimeout(this.updateJobs, 10000);
                this.SuccessUpdate = true;
                this.render();
            }.bind(this),
            error: function (model, xhr, options) {
                console.log(options);
                this.SuccessUpdate = false;
                this.resetTimer();
                this.render();
            }.bind(this)
        });
    }

    resetTimer() {
        if (this.loginTimer) {
            clearTimeout(this.loginTimer);
            delete this.loginTimer;
        }
    }

    addJobs() {
        this.clearJobs();
        this.jobs.forEach(
                function (job) {
                    const subview = new JobInfoView({model: job});
                    this.$('#jobinfolist').append(subview.render().el);
                    this.subviews.push(subview);
                }.bind(this)
                );
    }

    render() {
        this.$el.html(this.template({success: this.SuccessUpdate}));
        if (this.SuccessUpdate) {
            this.addJobs();
        }
        return this;
    }

    remove() {
        this.resetTimer();
        this.clearJobs();
        super.remove();
    }
}


export default JobInfoListView;

