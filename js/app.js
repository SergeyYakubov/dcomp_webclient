import Router from './routers/router';
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../css/styles.css";

window.app = {};

$(function () {
    app.router = new Router();
    Backbone.history.start();
});
