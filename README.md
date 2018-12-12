# vega-router

## Usage

Install the router

```sh
npm install --save-dev vega-router
```

Import it and extend it

```ts
import * as React from 'react';
import { Router } from 'vega-router';

interface IAppProps {}

export class App extends Router<IAppProps> {
  constructor(props: IAppProps) {
    super(props)

    this.addRoute('about', /^\/about\/?$/, About);
    this.addRoute('contact', /^\/contact\/?$/, Contact);

    this.addRoute('home', /.*/, Home);
  }
}

class Home extends Component {
  render() {
    return (
      <div>
        <h2>Home Page</h2>
        <p>This is the home page</p>
      </div>
    );
  }
}

class About extends Component {
  render() {
    return (
      <div>
        <h2>About Page</h2>
        <p>This is the about page</p>
      </div>
    );
  }
}

class Contact extends Component {
  render() {
    return (
      <div>
        <h2>Contact Page</h2>
        <p>This is the contact page</p>
      </div>
    );
  }
}
```

## Development

Install dependencies

```sh
npm install
```

Run the test app

```sh
npm run dev
```
