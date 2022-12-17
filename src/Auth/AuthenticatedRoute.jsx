import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CheckRole from './CheckRole';

const RouteAuthenticated = ({ component: Component, path }) => {
  const { isLoggedIn } = useSelector(state => state.auth);
  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }
  console.log(`path: ${path}`)
  console.log( `check: ${CheckRole()}`)
  if (path === '/home' && CheckRole()) return <Redirect to="/admin" />;

  return <Route component={Component} path={path} />;
};

export default RouteAuthenticated;
