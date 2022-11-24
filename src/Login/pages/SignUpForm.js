/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import{ api,toast} from  'react-project-management';


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
      await api.post('/api/auth/signup', JSON.stringify(state));
      history.push('/login');
    } catch (error) {
      toast.error(error);
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
        </div>

        <div className="formField">
          <label className="formFieldCheckboxLabel">
            <input
              className="formFieldCheckbox"
              type="checkbox"
              name="hasAgreed"
              value={state.hasAgreed}
              onChange={handleChange}
            />{' '}
            I agree all statements in{' '}
            <a href="null" className="formFieldTermsLink">
              terms of service
            </a>
          </label>
        </div>

        <div className="formField">
          <button className="formFieldButton">Sign Up</button>{' '}
          <Link to="/sign-in" className="formFieldLink">
            I'm already member
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
