import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';

import history from 'browserHistory';
// import Authenticate from 'Auth/Authenticate';
import PageError from 'components/PageError';

const Routes = () => (
  <Router history={history}>
    <Switch>
      <Redirect exact from="/" to="/" />
      <Route component={PageError} />
    </Switch>
  </Router>
);

export default Routes;
