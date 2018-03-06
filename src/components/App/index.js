import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import { NavLink } from 'react-router-dom';
import { Container, Menu } from 'semantic-ui-react';

import withAuthentication from '../Auth/withAuthentication';
import Home from '../Home';
import Login from '../Login';
import * as routes from '../../constants/routes';
import './index.css';

const App = () => (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <div>
      <Menu fixed='top'>
        <Container>
          <Menu.Item as={NavLink} active={true} to={routes.HOME} header>
            Xalgo Author
          </Menu.Item>
        </Container>
      </Menu>

      <Container style={{ marginTop: '4em' }}>
        <Switch>
          <Route path={routes.HOME} component={ Home } />
          <Route path={routes.SIGN_IN} component={ Login } />
        </Switch>
      </Container>
    </div>
  </BrowserRouter>
);

export default withAuthentication(App);
