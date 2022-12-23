/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState,useEffect } from 'react';
import { store } from 'store';
import {  useRouteMatch } from 'react-router-dom';
import history from 'browserHistory';
import { toast } from 'react-project-management';
import api from 'Services/api';
import "./styles.css"

const Account = () => {
  const match = useRouteMatch();
  useEffect(() => {
    getData();
  }, [state]);
  const getData = async () => {
    await api.get(`/api/users/information`).then(
      data => {
        setState(data)
        console.log(data);
        console.log(store.getState().auth.user.userId)
        console.log(state)

      },
      error => {
        toast.error(error);
      },
    );
  };
  const [state, setState] = useState({
    username: '',
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
    if (!userRegex.test(values.username)) {
      errors.username =
        'Username must be characters and number having a length of 6 to 30 characters!';
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
    const errors=validate(state);
    setFormErrors(errors);
    event.preventDefault();
    if (Object.keys(errors).length === 0) {
      try {
        await api.patch(`/api/users/${store.getState().auth.user.userId}`, JSON.stringify(state));
        toast.success('Change successfully');
        history.push(`${match.path}/account`);
      } catch (error) {
        toast.error(error);
      }
      
      setFormErrors({});
    }
  };

  return (

    // eslint-disable-next-line react/jsx-filename-extension
    <div className="formCenter">
         <p
          style={{
            fontFamily: 'cursive',
            fontWeight: 'bold',
            paddingTop: '18px',
            textAlign: 'center',
            fontStyle:'oblique',
            fontSize:'25px'
          }}
        >
          {' '}
          Account
        </p>
      <form onSubmit={handleSubmit} className="formFields" style={{ padding: "50px 124px"}}>
        <div className="formField">
          <label className="formFieldlablename" htmlFor="name">
            User name
          </label>
          <input
            type="text"
            id="name"
            className="formFieldInputAcc"
            name="username"
            value={state.username}
            onChange={handleChange}
          />
          <p style={{ color: 'red', fontSize: 13 }}>{formErrors.username}</p>
        </div>
        <div className="formField">
          <label className="formFieldlablename" htmlFor="firstName">
            First name
          </label>
          <input
            type="text"
            id="firstName"
            className="formFieldInputAcc"
            name="firstName"
            value={state.firstName}
            onChange={handleChange}
          />
          <p style={{ color: 'red', fontSize: 13 }}>{formErrors.firstName}</p>
        </div>
        <div className="formField">
          <label className="formFieldlablename" htmlFor="lastName">
            Last name
          </label>
          <input
            type="text"
            id="lastName"
            className="formFieldInputAcc"
            name="lastName"
            value={state.lastName}
            onChange={handleChange}
          />
          <p style={{ color: 'red', fontSize: 13 }}>{formErrors.lastName}</p>
        </div>
        <div className="formField">
          <label className="formFieldlablename" htmlFor="email">
            E-Mail Address
          </label>
          <input
            type="email"
            id="mailNotification"
            className="formFieldInputAcc"
            name="mailNotification"
            value={state.mailNotification}
            onChange={handleChange}
          />
          <p style={{ color: 'red', fontSize: 13 }}>{formErrors.mailNotification}</p>
        </div>

        <div className="formField" style={{display:"flex",justifyContent:"center"}}>
          <button className="snip1457" style={{marginRight:"180px"}}>Change</button>{' '}
        </div>
      </form>
    </div>
  );
};

export default Account;
