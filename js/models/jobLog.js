import { make_auth } from '../utils'


        class JobLog extends Backbone.Model {
    get defaults() {
        return {
            Content: "",
            Id: ""
        }
    }

    sync() {
        const url = "/jobs/" + this.id+"/" ;
        const request = $.ajax({
            type: 'GET',
            url: url,
            dataType: 'text',
            data: {log: true},
            headers: {"Authorization": make_auth("", "", app.state.get("token"))},
        });
        request.done(function (response,status, xhr) {
            this.set({Content: response});
        }.bind(this));
        request.fail(function (xhr, textStatus, errorThrown) {
            this.set({Content: "error reading log file"});
        }.bind(this));


    }

    get idAttribute() {
        return "Id"
    }

}
;
export default JobLog;