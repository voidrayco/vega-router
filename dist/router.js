"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var Router = (function (_super) {
    __extends(Router, _super);
    function Router() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.unmounting = false;
        _this.component = null;
        _this.routes = [];
        _this.route = null;
        _this.matchRoutes = function () {
            if (_this.unmounting)
                return;
            _this.route = null;
            var _loop_1 = function (route) {
                var match = location.pathname.match(route.path);
                if (match) {
                    var params = match.slice(1);
                    var namedParams = params.reduce(function (a, b, i) {
                        if (route.paramNames && route.paramNames[i]) {
                            a[route.paramNames[i]] = b;
                        }
                        else {
                            a[i] = b;
                        }
                        return a;
                    }, {});
                    _this.component = React.createElement(route.component, { params: namedParams });
                    _this.route = route;
                    _this.forceUpdate();
                    return { value: void 0 };
                }
            };
            for (var _i = 0, _a = _this.routes; _i < _a.length; _i++) {
                var route = _a[_i];
                var state_1 = _loop_1(route);
                if (typeof state_1 === "object")
                    return state_1.value;
            }
            _this.component = RouteManager.notFoundComponent ? (React.createElement(RouteManager.notFoundComponent, { params: [location.pathname] })) : null;
            _this.forceUpdate();
        };
        return _this;
    }
    Router.prototype.componentWillMount = function () {
        RouteManager.addStateListener(this.matchRoutes);
        this.matchRoutes();
    };
    Router.prototype.componentWillUnmount = function () {
        this.unmounting = true;
        RouteManager.removeStateListener(this.matchRoutes);
    };
    Router.prototype.addRoute = function (name, path, component, paramNames) {
        this.routes.push({ name: name, path: path, component: component, paramNames: paramNames });
    };
    Router.prototype.removeRoute = function (path) {
        this.routes = this.routes.filter(function (route) { return route.path !== path; });
    };
    Router.prototype.render = function () {
        return this.component;
    };
    return Router;
}(react_1.Component));
exports.Router = Router;
var Link = (function (_super) {
    __extends(Link, _super);
    function Link() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onClick = function () {
            RouteManager.transitionTo(_this.props.to);
        };
        return _this;
    }
    Link.prototype.render = function () {
        return React.createElement("a", { onClick: this.onClick }, this.props.children);
    };
    return Link;
}(react_1.Component));
exports.Link = Link;
window.onpopstate = function () {
    RouteManager.runStateListeners();
};
var RouteManager = (function () {
    function RouteManager() {
    }
    RouteManager.notFoundComponent = null;
    RouteManager.stateListeners = [];
    RouteManager.setNotFoundComponent = function (component) {
        RouteManager.notFoundComponent = component;
    };
    RouteManager.transitionTo = function (to) {
        window.history.pushState(null, '', to);
        RouteManager.runStateListeners();
    };
    RouteManager.addStateListener = function (listener) {
        RouteManager.stateListeners.push(listener);
    };
    RouteManager.removeStateListener = function (listener) {
        RouteManager.stateListeners = RouteManager.stateListeners.filter(function (sl) { return sl !== listener; });
    };
    RouteManager.runStateListeners = function () {
        RouteManager.stateListeners.forEach(function (sl) { return sl(); });
    };
    return RouteManager;
}());
exports.RouteManager = RouteManager;
//# sourceMappingURL=router.js.map