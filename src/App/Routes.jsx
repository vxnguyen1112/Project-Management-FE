import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import Project from 'Project';
import ListProject  from 'ListProject';
import Login from 'Login/Login';
import ProjectCreate from 'Project/ProjectCreate';
import history from 'browserHistory';
import PageError from 'components/PageError';
import RouteUnauthenticated from 'Auth/UnauthenticatedRoute';
import RouteAuthenticated from  'Auth/AuthenticatedRoute';


const Routes = () => (
  <Router history={history}>
    <Switch>
    <Redirect exact from="/" to="/login" />
    <RouteUnauthenticated path="/login" component={Login} />
    <RouteAuthenticated path="/project" component={Project} />
    <RouteAuthenticated path="/home" component={ListProject} />
    <RouteAuthenticated path="/create-project" component={ProjectCreate} />
    <Route component={PageError} />
    </Switch>
  </Router>
);

export default Routes;
