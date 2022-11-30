/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-project-management';
import api from 'Services/api';

const SignUpForm = () => {
  const history = useHistory();
  const [state, setState] = useState({
    username: '',
    password: '',
    confirmationPassword: '',
    firstName: '',
    lastName: '',
    mailNotification: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const validate = values => {
    const errors = {};
    const passRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const userRegex = /^[a-z0-9_-]{6,30}$/;
    const nameRegex = /^[a-zA-Z]+$/;
    const mailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!passRegex.test(values.password)) {
      errors.password =
        'Password must be minimum 8 characters, at least 1 uppercase letter, 1 number and 1 special character!';
    }
    if (!userRegex.test(values.username)) {
      errors.username =
        'Username must be characters and number having a length of 6 to 30 characters!';
    }
    if (values.password !== values.confirmationPassword) {
      errors.confirmationPassword = 'Your password and confirmation password do not match.!';
    }
    if (!nameRegex.test(values.firstName)) {
      errors.firstName = 'FirstName must be characters!';
    }
    if (!nameRegex.test(values.lastName)) {
      errors.lastName = 'LastName must be characters!';
    }
    if (!mailRegex.test(values.mailNotification)) {
      errors.mailNotification = 'Invalid Email Address!';
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
    setFormErrors(validate(state));
    event.preventDefault();
    if (Object.keys(formErrors).length === 0) {
      try {
        const authToken = await api.post('/api/auth/signup', JSON.stringify(state));
        console.log(authToken);
        toast.success('Singup successfully');
        history.push('/listproject');
      } catch (error) {
        toast.error(error);
      }
      setFormErrors({});
    }
  };

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div className="formCenter">
      <form onSubmit={handleSubmit} className="formFields">
        <div className="formField">
          <label className="formFieldLabel" htmlFor="name">
            User name
          </label>
          <input
            type="text"
            id="name"
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
          <label className="formFieldLabel" htmlFor="confirmationPassword">
            Confirmation Password
          </label>
          <input
            type="password"
            id="confirmationPassword"
            className="formFieldInput"
            placeholder="Enter your Confirmation Password"
            name="confirmationPassword"
            value={state.confirmationPassword}
            onChange={handleChange}
          />
          <p style={{ color: 'red', fontSize: 13 }}>{formErrors.confirmationPassword}</p>
        </div>
        <div className="formField">
          <label className="formFieldLabel" htmlFor="firstName">
            First name
          </label>
          <input
            type="text"
            id="firstName"
            className="formFieldInput"
            placeholder="Enter your last name"
            name="firstName"
            value={state.firstName}
            onChange={handleChange}
          />
          <p style={{ color: 'red', fontSize: 13 }}>{formErrors.firstName}</p>
        </div>
        <div className="formField">
          <label className="formFieldLabel" htmlFor="lastName">
            Last name
          </label>
          <input
            type="text"
            id="lastName"
            className="formFieldInput"
            placeholder="Enter your last name"
            name="lastName"
            value={state.lastName}
            onChange={handleChange}
          />
          <p style={{ color: 'red', fontSize: 13 }}>{formErrors.lastName}</p>
        </div>
        <div className="formField">
          <label className="formFieldLabel" htmlFor="email">
            E-Mail Address
          </label>
          <input
            type="email"
            id="mailNotification"
            className="formFieldInput"
            placeholder="Enter your email"
            name="mailNotification"
            value={state.mailNotification}
            onChange={handleChange}
          />
          <p style={{ color: 'red', fontSize: 13 }}>{formErrors.mailNotification}</p>
        </div>

        <div className="formField">
          <button className="formFieldButton">Sign Up</button>{' '}
          <Link to="/login" className="formFieldLink">
            I'm already member
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
