import * as React from 'react';
import { render } from 'react-dom';
import { App } from './app';

const root =
  document.querySelector('#main') ||
  document.body.appendChild(document.createElement('div'));
root.id = 'main';

render(<App />, root);

document.title = 'Vega Router Test App';
