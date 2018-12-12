import * as React from 'react';
import { Component } from 'react';

interface IRoute {
  component: any;
  name: string | (() => string);
  path: RegExp;
  paramNames?: string[];
}

export class Router<Props = {}, State = {}> extends Component<Props, State> {
  private unmounting: boolean = false;

  component: any = null;
  routes: IRoute[] = [];
  route: IRoute | null = null;

  componentWillMount() {
    RouteManager.addStateListener(this.matchRoutes);

    this.matchRoutes();
  }

  componentWillUnmount() {
    this.unmounting = true;
    RouteManager.removeStateListener(this.matchRoutes);
  }

  addRoute(
    name: IRoute['name'],
    path: IRoute['path'],
    component: IRoute['component'],
    paramNames?: IRoute['paramNames']
  ) {
    this.routes.push({ name, path, component, paramNames });
  }

  removeRoute(path: RegExp) {
    this.routes = this.routes.filter(route => route.path !== path);
  }

  private matchRoutes = () => {
    if (this.unmounting) return;

    this.route = null;
    for (const route of this.routes) {
      const match = location.pathname.match(route.path);
      if (match) {
        const params = match.slice(1);
        const namedParams = params.reduce<{ [key: string]: string }>(
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
        this.component = <route.component params={namedParams} />;
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

export class Link extends Component<{ to: string }> {
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
  static stateListeners: (() => void)[] = [];

  static setNotFoundComponent = (component: any) => {
    RouteManager.notFoundComponent = component;
  };

  static transitionTo = (to: string) => {
    window.history.pushState(null, '', to);
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
