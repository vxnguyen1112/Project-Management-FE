import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CheckRole from './CheckRole';

const RouteAuthenticated = ({ component: Component, path }) => {
  const { isLoggedIn } = useSelector(state => state.auth);
  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }
  console.log(path)
  if (path === '/home' && CheckRole()) return <Redirect to="/admin" />;
  if (path === '/admin' && !CheckRole()) return <Redirect to="/home" />;

  return <Route component={Component} path={path} />;
};

export default RouteAuthenticated;
