import { Component } from 'react';
interface IRoute {
    component: any;
    name: string | (() => string);
    path: RegExp;
    paramNames?: string[];
    className?: string;
}
export declare class Router<Props = {}, State = {}> extends Component<Props, State> {
    private unmounting;
    component: any;
    routes: IRoute[];
    route: IRoute | null;
    params: {
        [key: string]: string;
    };
    componentWillMount(): void;
    componentWillUnmount(): void;
    addRoute: (name: string | (() => string), path: RegExp, component: any, paramNames?: string[] | undefined, className?: string | undefined) => void;
    removeRoute(name: string): void;
    private matchRoutes;
    render(): any;
}
interface ILinkProps {
    to: string;
}
export declare class Link extends Component<ILinkProps> {
    onClick: () => void;
    render(): JSX.Element;
}
export declare class RouteManager {
    static notFoundComponent: any;
    static routeClassName: string | undefined;
    static stateListeners: (() => void)[];
    static setNotFoundComponent: (component: any) => void;
    static setRouteClassName: (className?: string | undefined) => void;
    static transitionTo: (to: string, replace?: boolean | undefined) => void;
    static addStateListener: (listener: () => void) => void;
    static removeStateListener: (listener: () => void) => void;
    static runStateListeners: () => void;
}
export {};
