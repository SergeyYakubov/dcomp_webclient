class LoginState extends Backbone.Model {
    get defaults() {
        return {
            logged: false,
            user: "",
            attempts: 0,
            errorText: "",
            token: ""
        }
    }

    loginWithSavedToken() {
        let statestr = localStorage.getItem("state");
        if (!statestr) {
            return;
        }

        let state = JSON.parse(statestr);
        if (!state.token) {
            return;
        }

        this.set(state);
        this.login("", "", state.token);
    }

    initialize() {

    }

    reset() {
        this.clear({silent: true});
        this.setDefaults();
    }
    setDefaults() {
        this.set(this.defaults);
    }
    login(user, passwd, token) {
        var that = this;
        var request = $.ajax({
            type: 'GET',
            url: 'https://localhost:8001/login/',
            dataType: 'json',
            headers: {"Authorization": make_auth(user, passwd, token)},
        });
        request.done(function (response) {
            var newstate = {
                logged: true,
                user: response.UserName,
                token: response.Token,
            };
            localStorage.setItem("state", JSON.stringify(newstate));
            that.set(newstate);
            if (response.ValidityTime > 0) {
                that.loginTimer = setTimeout(that.login.bind(that),
                        response.ValidityTime * 60000 - 10000,
                        "", "", response.Token);
            }
        });
        request.fail(function (xhr, textStatus, errorThrown) {
            const message = xhr.status === 401 ?
                    "Wrong username or password." :
                    "Error from server. Please try later.";
            if (!token) {
                var newstate = {
                    attempts: that.get('attempts') + 1,
                    errorText: message,
                };
                that.set(newstate);
            }
            localStorage.setItem("state", "");
        });
    }
    logout() {
        clearTimeout(this.loginTimer);
        this.setDefaults();
        localStorage.setItem("state", "");
    }
}
;

function make_auth(user, password, token) {
    if (token) {
        return token;
    }
    var tok = user + ':' + password;
    var hash = btoa(tok);
    return 'Basic ' + hash;
}


export default LoginState;