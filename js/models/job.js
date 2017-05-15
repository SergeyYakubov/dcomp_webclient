class JobInfo extends Backbone.Model {
    get defaults() {
        return {
            ImageName: "",
            Script: "",
            NCPUs: 1,
            NNodes: 0,
            Resource: "",
            StatusString: "",
            StartTime: "",
            EndTime: "",
            Message: "",
            Id: "",
            SubmitTime:""
        }
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