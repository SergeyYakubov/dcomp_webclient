import JobInfo from "../models/job";
import JobInfos from "../collections/jobs";
import JobInfoView from '../../js/views/jobinfoview';
class JobInfoListView extends Backbone.View {

    initialize() {
        _.bindAll(this, "render", "updateJobs", "addJob", "removeJob",
                "changedCollection", "onClickExpandButton", "onClick");
        this.template = _.template(require('../../templates/jobinfolist.html'));
        this.jobs = new JobInfos();
        this.listenTo(this.jobs, 'add', this.addJob);
        this.listenTo(this.jobs, 'remove', this.removeJob);
        this.listenTo(this.jobs, 'change', this.changedCollection);

        this.subviews = [];
        this.resetjobs = true;
        this.updateJobs();
    }

    get events() {
        return {
            "click": "onClick",
            "click #expandButton": "onClickExpandButton"
        }
    }

    clearJobs() {
        for (let i = 0; i < this.subviews.length; i++) {
            this.subviews[i].remove();
        }
        this.subviews.length = 0;
    }

    changedCollection() {
        console.log("changed");
    }

    updateJobs() {
        this.jobs.fetch({
            data: {finished: true},
            reset: this.resetjobs,
            merge: false,
            headers: {'Authorization': app.state.get("token")},
            success: function (collection, response, options) {
                // need this to process empty JSON response
                if (response == null) {
                    this.jobs.set([]);
                }
                this.loginTimer = setTimeout(this.updateJobs, 1000);
                this.SuccessUpdate = true;
                if (this.resetjobs) {
                    this.resetjobs = false;
                    this.render();
                }
            }.bind(this),
            error: function (model, xhr, options) {
                console.log(options)
                this.SuccessUpdate = false;
                this.resetTimer();
                this.resetjobs = true;
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

    addJob(job) {
        const subview = new JobInfoView({model: job});
        subview.parentView = this;
        this.$('#jobinfolist').append(subview.render().el);
        this.$('#jobinfolist').append(subview.extendedView.el);
        this.subviews.push(subview);
    }

    removeJob(model, collection, options) {
        this.subviews[options.index].extendedView.remove();
        this.subviews[options.index].remove();
        this.subviews.splice(options.index, 1);
    }

    addJobs() {
        this.clearJobs();
        this.jobs.forEach(this.addJob);
    }

    render() {
        this.$el.html(this.template({success: this.SuccessUpdate}));
        this.addJobs();
        this.allExpanded = false;
        return this;
    }

    remove() {
        this.resetTimer();
        this.clearJobs();
        super.remove();
    }

    onClickExpandButton() {
        for (let i = 0; i < this.subviews.length; i++) {
            const id = "#" + this.subviews[i].model.get("Id");
            this.$(id).collapse(this.allExpanded ? "hide" : "show");
        }
        this.allExpanded = !this.allExpanded;
        this.setExpandButtonText();
    }

    setExpandButtonText() {
        this.$('#expandButton').text(this.allExpanded ? "Hide all details" :
                "Expand all details");
    }

    updateExpanded() {
        let allCollapsed = true;
        let allExpanded = true;
        for (let i = 0; i < this.subviews.length; i++) {
            if (this.subviews[i].collapsed) {
                allExpanded = false;
            } else {
                allCollapsed = false;
            }
        }
        if (allCollapsed && this.allExpanded) {
            this.allExpanded = false;
            this.setExpandButtonText();
        }

        if (allExpanded && !this.allExpanded) {
            this.allExpanded = true;
            this.setExpandButtonText();
        }
    }

    onClick() {
        this.$("button").blur();
    }

}


export default JobInfoListView;

