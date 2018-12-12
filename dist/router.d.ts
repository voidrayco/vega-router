import { Component } from 'react';
interface IRoute {
    component: any;
    name: string | (() => string);
    path: RegExp;
    paramNames?: string[];
}
export declare class Router<Props = {}, State = {}> extends Component<Props, State> {
    private unmounting;
    component: any;
    routes: IRoute[];
    route: IRoute | null;
    componentWillMount(): void;
    componentWillUnmount(): void;
    addRoute(name: IRoute['name'], path: IRoute['path'], component: IRoute['component'], paramNames?: IRoute['paramNames']): void;
    removeRoute(path: RegExp): void;
    private matchRoutes;
    render(): any;
}
export declare class Link extends Component<{
    to: string;
}> {
    onClick: () => void;
    render(): JSX.Element;
}
export declare class RouteManager {
    static notFoundComponent: any;
    static stateListeners: (() => void)[];
    static setNotFoundComponent: (component: any) => void;
    static transitionTo: (to: string) => void;
    static addStateListener: (listener: () => void) => void;
    static removeStateListener: (listener: () => void) => void;
    static runStateListeners: () => void;
}
export {};
