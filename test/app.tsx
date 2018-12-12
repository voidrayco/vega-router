import * as React from 'react';
import { Component } from 'react';
import { Router, RouteManager } from '../src';

interface IAppProps {}

export class App extends Router<IAppProps> {
  constructor(props: IAppProps) {
    super(props);

    RouteManager.setNotFoundComponent(() => <h4>Route Not Found</h4>);
    RouteManager.setRouteClassName('Content');

    this.addRoute('settings', /^\/settings/, Settings);
    this.addRoute('contact', /^\/contact\/?$/, Contact);

    // Must be last
    this.addRoute('home', /.*/, Home);
  }

  render() {
    return (
      <div>
        <header>
          <a href="/">home</a> | <a href="/settings">settings</a> | <a href="/contact">contact</a>
        </header>
        <div>
          <h1>Vega Router Test App</h1>
          {super.render()}
        </div>
        <footer>&copy; {new Date().getFullYear()} Vega</footer>
      </div>
    );
  }
}

interface IBaseProps {
  className?: string;
}

class Home extends Component<IBaseProps> {
  render() {
    return (
      <div className={this.props.className}>
        <h2>Home Page</h2>
        <p>This is the home page</p>
      </div>
    );
  }
}

class Contact extends Component<IBaseProps> {
  render() {
    return (
      <div className={this.props.className}>
        <h2>Contact Page</h2>
        <p>This is the contact page</p>
      </div>
    );
  }
}

interface ISettingsProps extends IBaseProps {}

class Settings extends Router<ISettingsProps> {
  constructor(props: ISettingsProps) {
    super(props);

    this.addRoute('settings:account', /^\/settings(\/account)?\/?$/, SettingsAccount);
    this.addRoute('settings:billing', /^\/settings\/billing\/?$/, SettingsBilling);
  }

  render() {
    return (
      <div className={this.props.className}>
        <h2>Settings Page</h2>
        <p>This is the settings page</p>
        <div>
          <a href="/settings/account">account</a> | <a href="/settings/billing">billing</a>
        </div>
        {super.render()}
      </div>
    );
  }
}

class SettingsAccount extends Component<IBaseProps> {
  render() {
    return (
      <div className={this.props.className}>
        <h3>Account Settings</h3>
      </div>
    );
  }
}

class SettingsBilling extends Component<IBaseProps> {
  render() {
    return (
      <div className={this.props.className}>
        <h3>Billing Settings</h3>
      </div>
    );
  }
}
