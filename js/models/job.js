class JobInfo extends Backbone.Model {
    get urlRoot() {
        return "jobs/";
    }
    get defaults() {
        return {
            ImageName: "",
            Script: "",
            NCPUs: 0,
            NNodes: 1,
            Resource: "",
            StatusString: "",
            StartTime: "",
            EndTime: "",
            Message: "",
            Id: "",
            SubmitTime: "",
            JobName: "",
        }
    }

    prepareJobDescription() {
        let obj = this.attributes;
        for (var propName in obj) {
            if (obj[propName] === "" || obj[propName] === 0) {
                delete obj[propName];
            }
        }
        if (obj.NNodes > 0) {
            delete obj.NCPUs;
        }
        return obj;
    }

    submitToServer(callback) {

        const request = $.ajax({
            type: 'POST',
            url: this.url(),
            dataType: 'json',
            data: JSON.stringify(this.prepareJobDescription()),
            headers: {'Authorization': app.state.get("token")},
        });
        request.done(function (data, textStatus, xhr) {
            callback("");
        });
        request.fail(function (xhr, textStatus, errorThrown) {
            callback(errorThrown);
        });
    }

    get idAttribute() {
        return "Id"
    }

    stopJob() {

        const request = $.ajax({
            type: 'PATCH',
            url: this.url(),
            dataType: 'json',
            data: JSON.stringify({"Status": 102}),
            headers: {'Authorization': app.state.get("token")},
        });
        request.fail(function (xhr, textStatus, errorThrown) {
            console.log("stop job failed");
        });
    }

    removeJob() {
        this.destroy({
            wait: true,
            headers: {'Authorization': app.state.get("token")},
            error: function (model, response, options) {
                console.log(options.xhr.responseText);
            }
        });
    }

}
;
export default JobInfo;