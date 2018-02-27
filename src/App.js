import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { NavLink } from 'react-router-dom';
import { Container, Menu } from 'semantic-ui-react';

import { HomeView } from './views/home';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Menu fixed='top'>
          <Container>
            <Menu.Item as={NavLink} active='true' to='/home' header>
              Xalgo Author
            </Menu.Item>
          </Container>
        </Menu>

        <Container style={{ marginTop: '4em' }}>
          <Switch>
            <Route path='/home' component={ HomeView } />
          </Switch>
        </Container>
      </div>
    );
  }
}

export default App;
