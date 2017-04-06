class JobInfo extends Backbone.Model {
    get defaults() {
        return {
            ImageName: "",
            Script: "",
            NCPUs: 1,
            NNodes: 0,
            Resource: "",
            Status: "",
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