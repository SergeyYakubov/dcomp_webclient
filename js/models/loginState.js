import { make_auth } from '../utils'

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
            delete this.loginTimer;
        }
        this.clear({silent: true});
        this.set(this.defaults);
        localStorage.setItem("state", "");
    }

    login(user, passwd, token) {
        const request = $.ajax({
            type: 'GET',
            url: 'login/',
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
            this.set(newstate);
            if (response.ValidityTime > 0) {
                this.loginTimer = setTimeout(_.bind(this.login,this),                
                        response.ValidityTime * 60000 - 10000,
                        "", "", response.Token);
            }
        }.bind(this));
        request.fail(function (xhr, textStatus, errorThrown) {
            const message = xhr.status === 401 ?
                    "Wrong username or password." :
                    "Error from server. Please try later.";
            if (!token) {
                const newstate = {
                    attempts: this.get('attempts') + 1,
                    errorText: message,
                };
                this.set(newstate);
            } else {
                this.reset();
            }
        }.bind(this));
    }

    logout() {
        this.reset();
    }
}
;


export default LoginState;