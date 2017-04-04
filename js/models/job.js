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
            Message: ""
        }
    }

}
;
export default JobInfo;