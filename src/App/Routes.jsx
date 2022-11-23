import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import Project from 'Project';
import Login from 'Login/Login';
import history from 'browserHistory';
// import Authenticate from 'Auth/Authenticate';
import PageError from 'components/PageError';

const Routes = () => (
  <Router history={history}>
    <Switch>
    <Redirect exact from="/" to="/login" />
    <Route path="/project" component={Project} />
    <Route path="/login" component={Login} />
      <Route component={PageError} />
    </Switch>
  </Router>
);

export default Routes;
