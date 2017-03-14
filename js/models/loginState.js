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

    reset() {
        if (this.loginTimer) {
            clearTimeout(this.loginTimer);
        }
        this.clear({silent: true});
        this.set(this.defaults);
        localStorage.setItem("state", "");
    }

    login(user, passwd, token) {
        var that = this;
        const request = $.ajax({
            type: 'GET',
            url: 'https://localhost:8001/login/',
            dataType: 'json',
            headers: {"Authorization": make_auth(user, passwd, token)},
        });
        request.done(function (response) {
            const newstate = {
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
                const newstate = {
                    attempts: that.get('attempts') + 1,
                    errorText: message,
                };
                that.set(newstate);
            } else {
                that.reset();
            }
        });
    }

    logout() {
        this.reset();
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