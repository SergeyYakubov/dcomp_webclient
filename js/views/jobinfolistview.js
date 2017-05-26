import JobInfo from "../models/job";
import JobInfos from "../collections/jobs";
import JobInfoView from '../../js/views/jobinfoview';
import JobInfoViewExpanded from '../../js/views/jobinfoview_expanded';

import sinon from "sinon";

class JobInfoListView extends Backbone.View {

    initialize() {
        _.bindAll(this, "render", "updateJobs", "addJob", "removeJob",
                "onClickExpandButton", "onClick", "onClickSelectAll");
        this.template = _.template(require('../../templates/jobinfolist.html'));
        this.jobs = new JobInfos();
        this.listenTo(this.jobs, 'add', this.addJob);
        this.listenTo(this.jobs, 'remove', this.removeJob);
        this.listenTo(this.model, 'change:from', this.onFilterChange);
        this.subviews = [];
        this.subviews_e = [];
        this.resetjobs = true;
        this.updateJobs();
        this.stopTimerFlag = false;
    }

    onFilterChange() {
        this.removeTimer();
        this.updateJobs();
    }

    get events() {
        return {
            "click": "onClick",
            "click #expandButton": "onClickExpandButton",
            "click #joblist_selectall": "onClickSelectAll"

        }
    }

    clearJobs() {
        for (let i = this.subviews_e.length - 1; i >= 0; i--) {
            this.subviews_e[i].remove();
            this.subviews[i].remove();
        }
        this.subviews.length = 0;
        this.subviews_e.length = 0;
    }

    updateJobs() {
        this.jobs.fetch({
            data: this.model.attributes,
            reset: this.resetjobs,
            merge: true,
            headers: {'Authorization': app.state.get("token")},
            success: function (collection, response, options) {
                // need this to process empty JSON response
                if (response == null) {
                    this.jobs.set([]);
                }
                if (!this.stopTimerFlag) {
                    this.startTimer();
                }
                this.SuccessUpdate = true;
                if (this.resetjobs) {
                    this.resetjobs = false;
                    this.render();
                }
            }.bind(this),
            error: function (model, xhr, options) {
                if (xhr.status === 401)
                {
                    app.state.logout();
                    return;
                }
                this.SuccessUpdate = false;
                if (!this.stopTimerFlag) {
                    this.startTimer(10000);
                }
                this.resetjobs = true;
                this.render();
            }.bind(this)
        });
    }

    startTimer(interval) {
        this.stopTimerFlag = false;
        this.loginTimer = setTimeout(this.updateJobs, interval || 1000);
    }

    removeTimer() {
        this.stopTimerFlag = true;
        if (this.loginTimer) {
            clearTimeout(this.loginTimer);
            delete this.loginTimer;
        }
    }

    addJob(job) {
        const subview = new JobInfoView({model: job});
        const subviewExpanded = new JobInfoViewExpanded({model: job});
        subviewExpanded.parentView = this;
        this.$('#jobinfolist').append(subview.render().el);
        this.$('#jobinfolist').append(subviewExpanded.render().el);
        this.subviews.push(subview);
        this.subviews_e.push(subviewExpanded);

    }

    removeJob(model, collection, options) {
        this.subviews[options.index].remove();
        this.subviews.splice(options.index, 1);
        this.subviews_e[options.index].remove();
        this.subviews_e.splice(options.index, 1);
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
        this.removeTimer();
        this.clearJobs();
        super.remove();
    }

    onClickExpandButton() {
        for (let i = this.subviews_e.length - 1; i >= 0; i--) {
            this.subviews_e[i].$el.collapse(this.allExpanded ? "hide" : "show");
        }
        this.setExpandButtonText();
    }

    onClickSelectAll() {
        const isSelected = this.$("#joblist_selectall").is(":checked");
        for (let i = this.subviews.length - 1; i >= 0; i--) {
            this.subviews[i].setSelected(isSelected);
        }
    }

    setExpandButtonText() {
        this.$('#expandButton').text(this.allExpanded ? "Hide all details" :
                "Expand all details");
    }

    updateExpanded() {
        let allCollapsed = true;
        let allExpanded = true;
        for (let i = this.subviews_e.length - 1; i >= 0; i--) {
            if (this.subviews_e[i].collapsed) {
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

    sendStopCommandForSelectedJobs() {
        this.removeTimer();
        this.subviews.filter(val => val.isSelected()).forEach(val =>
            val.model.stopJob()
        );
        this.startTimer();
    }

    sendRemoveCommandForSelectedJobs() {
        console.log(this.subviews);
        this.removeTimer();
        this.subviews.filter(val => val.isSelected()).forEach(val =>
            val.model.removeJob()
        );
        this.startTimer();
    }
}


export default JobInfoListView;

