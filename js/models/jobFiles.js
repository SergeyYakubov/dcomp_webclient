import { make_auth } from '../utils';


class JobFiles extends Backbone.Model {
    get defaults() {
        return {
            Id: ""
        }
    }

    sync() {
        const path = "/";
        const url = "/jobfile/" + this.get("Id") + "/";
        const request = $.ajax({
            type: 'GET',
            url: url,
            dataType: 'json',
            data: {path: encodeURIComponent(path), nameonly: false},
            headers: {"Authorization": make_auth("", "", app.state.get("token"))},
        });
        request.done(function (response, status, xhr) {
            this.downloadFiles(response.Srv, response.Token);
        }.bind(this));
        request.fail(function (xhr, textStatus, errorThrown) {
            alert("Cannot download file - wrong credentials");
        }.bind(this));
    }

    downloadFiles(srv, token) {
        let srvname;
        if (srv.Host == "localhost") {
            srvname = "localdmd";
        } else if (srv.Host == "max-wgs001") {
            srvname = "maxwell";
        }
        const url = srvname + "/jobfile/" + this.get("Id") + "/?path=" +
                encodeURIComponent("/") + "&nameonly=false";

        document.cookie = "Authorization=" + token;

        this.EmulateDownloadLinkClick(url);

    }

    EmulateDownloadLinkClick(url) {
        const link = document.createElement('a');
        link.href = url;
        link.download = "";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    }

}
;
export default JobFiles;