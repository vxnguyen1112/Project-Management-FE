/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import history from 'browserHistory';
import { FacebookLoginButton, InstagramLoginButton } from 'react-social-login-buttons';
import { toast ,storeAuthToken} from 'react-project-management';

import api from 'Services/api';

const SignInForm = () => {
  const [state, setState] = useState({ username: '', password: 'Ket@1512001' });
  const [formErrors, setFormErrors] = useState({});
  const validate = values => {
    const errors = {};
    const passRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const userRegex = /^[a-z0-9_-]{6,30}$/;
    if (!passRegex.test(values.password)) {
      errors.password =
        'Password must be minimum 8 characters, at least 1 uppercase letter, 1 number and 1 special character!';
    }
    if (!userRegex.test(values.username)) {
      errors.username =
        'Username must be characters and number having a length of 6 to 30 characters!';
    }
    return errors;
  };

  const handleChange = event => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    setState(previousState => {
      return { ...previousState, [name]: value };
    });
  };
  const handleSubmit = async event => {
    const errors=validate(state);
    setFormErrors(errors);
    event.preventDefault();
    if (Object.keys(errors).length === 0) {
      try {
        const data = await api.post('/api/auth/signin', JSON.stringify(state));
        storeAuthToken(data.accessToken);
        toast.success('Logged in successfully');
        history.push('/home');
      } catch (error) {
        toast.error(error);
      } 
      setFormErrors({});
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
          <p style={{ color: 'red', fontSize: 13 }}>{formErrors.username}</p>
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
          <p style={{ color: 'red', fontSize: 13 }}>{formErrors.password}</p>
        </div>

        <div className="formField">
          <button className="formFieldButton">Sign In</button>{' '}
          <Link to="/login/sign-in" className="formFieldLink">
            Create an account
          </Link>
        </div>

        <div className="socialMediaButtons">
          <div className="facebookButton">
            <FacebookLoginButton />
          </div>

          <div className="instagramButton">
            <InstagramLoginButton />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
