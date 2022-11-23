/* eslint-disable react/jsx-filename-extension */
import React, { Fragment } from "react";
import { useRouteMatch, Route, NavLink,Redirect } from "react-router-dom";
import SignUpForm from "./pages/SignUpForm";
import SignInForm from "./pages/SignInForm";

import "./Login.css";

// eslint-disable-next-line react/prefer-stateless-function
const Login = () => {
    const match = useRouteMatch();
    return (
      <Fragment>
        <div className="login">
          <div className="loginAside" />
          <div className="loginForm">
            <div className="pageSwitcher">
              <NavLink
                to={`${match.path}/sign-in`}
                activeClassName="pageSwitcherItem-active"
                className="pageSwitcherItem"
              >
                Sign In
              </NavLink>
              <NavLink
                exact
                to="/login"
                activeClassName="pageSwitcherItem-active"
                className="pageSwitcherItem"
              >
                Sign Up
              </NavLink>
            </div>

            <div className="formTitle">
              <NavLink
                to={`${match.path}/sign-in`}
                activeClassName="formTitleLink-active"
                className="formTitleLink"
              >
                Sign In
              </NavLink>{" "}
              or{" "}
              <NavLink
                exact
                to={`${match.path}`}
                activeClassName="formTitleLink-active"
                className="formTitleLink"
              >
                Sign Up
              </NavLink>
            </div>

            <Route exact  path={`${match.path}`} component={SignInForm} />
            <Route  path={`${match.path}/sign-in`} component={SignUpForm} />

            {match.isExact && <Redirect to={`${match.url}`} />}
          </div>
        </div>
        </Fragment>
    );
  }
export default Login;
