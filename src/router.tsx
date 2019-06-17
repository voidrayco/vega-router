import * as React from 'react';
import { Component } from 'react';

interface IRoute {
  component: any;
  name: string | (() => string);
  path: RegExp;
  paramNames?: string[];
  className?: string;
}

export class Router<Props = {}, State = {}> extends Component<Props, State> {
  private unmounting: boolean = false;

  component: any = null;
  routes: IRoute[] = [];
  route: IRoute | null = null;
  params: {[key: string]: string} = {};

  componentWillMount() {
    RouteManager.addStateListener(this.matchRoutes);

    this.matchRoutes();
  }

  componentWillUnmount() {
    this.unmounting = true;
    RouteManager.removeStateListener(this.matchRoutes);
  }

  addRoute = (
    name: IRoute['name'],
    path: IRoute['path'],
    component: IRoute['component'],
    paramNames?: IRoute['paramNames'],
    className?: IRoute['className'],
  ) => {
    const route = this.routes.some(route => route.name === name);
    if (route) {
      throw new Error(`route with name "${name}" already exists`);
    }
    this.routes.push({ name, path, component, paramNames, className });
  };

  removeRoute(name: string) {
    this.routes = this.routes.filter(route => route.name !== name);
  }

  private matchRoutes = () => {
    if (this.unmounting) return;

    this.route = null;
    for (const route of this.routes) {
      const match = location.pathname.match(route.path);
      if (match) {
        const paramValues = match.slice(1);
        this.params = paramValues.reduce<{ [key: string]: string }>(
          (a, b, i) => {
            if (route.paramNames && route.paramNames[i]) {
              a[route.paramNames[i]] = b;
            } else {
              a[i] = b;
            }
            return a;
          },
          {}
        );
        this.component = <route.component className={route.className || RouteManager.routeClassName} params={this.params} />;
        this.route = route;
        this.forceUpdate();
        return;
      }
    }

    this.component = RouteManager.notFoundComponent ? (
      <RouteManager.notFoundComponent params={[location.pathname]} />
    ) : null;
    this.forceUpdate();
  };

  render() {
    return this.component;
  }
}

interface ILinkProps {
  to: string;
}

export class Link extends Component<ILinkProps> {
  onClick = () => {
    RouteManager.transitionTo(this.props.to);
  };

  render() {
    return <a onClick={this.onClick}>{this.props.children}</a>;
  }
}

window.onpopstate = () => {
  RouteManager.runStateListeners();
};

export class RouteManager {
  static notFoundComponent: any = null;
  static routeClassName: string | undefined;
  static stateListeners: (() => void)[] = [];

  static setNotFoundComponent = (component: any) => {
    RouteManager.notFoundComponent = component;
  };

  static setRouteClassName = (className?: string) => {
    RouteManager.routeClassName = className;
  };

  static transitionTo = (to: string, replace?: boolean) => {
    if (replace) {
      window.history.replaceState(null, '', to);
    } else {
      window.history.pushState(null, '', to);
    }
    RouteManager.runStateListeners();
  };

  static addStateListener = (listener: () => void) => {
    RouteManager.stateListeners.push(listener);
  };

  static removeStateListener = (listener: () => void) => {
    RouteManager.stateListeners = RouteManager.stateListeners.filter(
      sl => sl !== listener
    );
  };

  static runStateListeners = () => {
    RouteManager.stateListeners.forEach(sl => sl());
  };
}
