import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import Project from 'Project';
import ListProject  from 'ListProject';
import Login from 'Login/Login';
import ProjectCreate from 'Project/ProjectCreate';
import history from 'browserHistory';
import PageError from 'components/PageError';

const Routes = () => (
  <Router history={history}>
    <Switch>
    <Redirect exact from="/" to="/login" />
    <Route path="/project" component={Project} />
    <Route path="/login" component={Login} />
    <Route path="/home" component={ListProject} />
    <Route path="/create-project" component={ProjectCreate} />
    <Route component={PageError} />
    </Switch>
  </Router>
);

export default Routes;
