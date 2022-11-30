/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FacebookLoginButton, InstagramLoginButton } from 'react-social-login-buttons';
import {toast, getStoredAuthToken, storeAuthToken } from 'react-project-management'

import api from  'Services/api'

const SignInForm = () => {
  const history = useHistory();
  const [state, setState] = useState({ username: '', password: 'A123qwe@' });
  const handleChange = event => {
    const {target} = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const {name} = target;
    setState(previousState => {
      return { ...previousState, [name]: value };
    });
  };
  const handleSubmit = async event => {
    event.preventDefault();

    console.log('The form was submitted with the following data:');
    console.log(state);
    try {
      const  authToken   = await api.post('/api/auth/signin', JSON.stringify(state));
      console.log(authToken);
      toast.success('Logged in successfully');
      history.push('/listproject');
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  
  };
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div className="formCenter">
      <form className="formFields" onSubmit={handleSubmit}>
        <div className="formField">
          <label className="formFieldLabel" htmlFor="email">
            E-Mail Address
          </label>
          <input
            type="text"
            id="username"
            className="formFieldInput"
            placeholder="Enter your username"
            name="username"
            value={state.username}
            onChange={handleChange}
          />
        </div>

        <div className="formField">
          <label className="formFieldLabel" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="formFieldInput"
            placeholder="Enter your password"
            name="password"
            value={state.password}
            onChange={handleChange}
          />
        </div>

        <div className="formField">
          <button className="formFieldButton">Sign In</button>{' '}
          <Link to="/login/sign-in" className="formFieldLink">
            Create an account
          </Link>
        </div>

        <div className="socialMediaButtons">
          <div className="facebookButton">
            <FacebookLoginButton onClick={() => alert('Hello')} />
          </div>

          <div className="instagramButton">
            <InstagramLoginButton onClick={() => alert('Hello')} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
