import React from 'react';
import { Redirect, Route} from 'react-router-dom';

import { isAuthenticated } from './CheckAuth';

const RouteUnauthenticated = ({ component: Component, path }) => {
  if (isAuthenticated()) {
    return <Redirect to="/home" />;
  }

  return <Route component={Component} path={path} />;
};

export default RouteUnauthenticated;