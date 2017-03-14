import Router from './routers/router';
import "../node_modules/bootstrap/dist/css/bootstrap.css";

window.app = {};

$(function () {
    app.router = new Router();
    Backbone.history.start();
});
