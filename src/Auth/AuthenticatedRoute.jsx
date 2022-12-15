import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';


const RouteAuthenticated = ({ component: Component, path }) => {
  const {isLoggedIn}=useSelector(state=>state.auth)
  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }
  return <Route component={Component} path={path} />;
};

export default RouteAuthenticated;