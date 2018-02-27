import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import './index.css';
import 'semantic-ui-css/semantic.min.css';

ReactDOM.render(
  (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <App />
    </BrowserRouter>
  ),
  document.getElementById('root'));
registerServiceWorker();
