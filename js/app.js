import LoginState from './models/loginState';
import Router from './routers/router';


import "../node_modules/bootstrap/dist/css/bootstrap.css";


window.app = {};
app.state = new LoginState();

$(function () {
    app.router = new Router();
    Backbone.history.start();
});
