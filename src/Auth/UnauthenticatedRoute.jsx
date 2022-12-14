import React from 'react';
import { Redirect, Route} from 'react-router-dom';
import { useSelector } from 'react-redux';


const RouteUnauthenticated = ({ component: Component, path }) => {
  const {isLoggedIn}=useSelector(state=>state.auth)
  if (isLoggedIn) {
    return <Redirect to="/home" />;
  }

  return <Route component={Component} path={path} />;
};

export default RouteUnauthenticated;