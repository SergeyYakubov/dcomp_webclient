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
            Id: ""
        }
    }

    get idAttribute() {
        return "Id"
    }

}
;
export default JobInfo;