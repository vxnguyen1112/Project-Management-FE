/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { store } from 'store';
import {  useRouteMatch } from 'react-router-dom';
import history from 'browserHistory';
import { toast } from 'react-project-management';
import api from 'Services/api';
// import "./styles.css"

const AddRole = () => {
  const match = useRouteMatch();
  const [state, setState] = useState({
    name: '',
    code: '',
    description: '',
    organizationId: store.getState().auth.user.organizationId,
  });

  const [formErrors, setFormErrors] = useState({});
  const validate = values => {
    const errors = {};
    const userRegex = /^[a-z0-9]+$/i
    if (!userRegex.test(values.name)) {
      errors.name =
        'Invalid value!';
    }
    if (!userRegex.test(values.code)) {
      errors.code = 'Invalid value!';
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
        await api.post(`/api/roles`, JSON.stringify(state));
        toast.success('Add roles successfully');
        history.push(`/admin/role`);
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
            fontSize:'25px',
            marginRight:"120px"
          }}
        >
          {' '}
          Roles
        </p>
      <form onSubmit={handleSubmit} className="formFields" style={{ padding: "50px 124px"}}>
        <div className="formField">
          <label className="formFieldlablename" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="formFieldInputAcc"
            name="name"
            value={state.name}
            onChange={handleChange}
          />
          <p style={{ color: 'red', fontSize: 13 }}>{formErrors.name}</p>
        </div>
        <div className="formField">
          <label className="formFieldlablename" htmlFor="firstName">
            Code
          </label>
          <input
            type="text"
            id="code"
            className="formFieldInputAcc"
            name="code"
            value={state.code}
            onChange={handleChange}
          />
          <p style={{ color: 'red', fontSize: 13 }}>{formErrors.code}</p>
        </div>
        <div className="formField">
          <label className="formFieldlablename" htmlFor="lastName">
          Description
          </label>
          <input
            type="text"
            id="description"
            className="formFieldInputAcc"
            name="description"
            value={state.description}
            onChange={handleChange}
          />
          <p style={{ color: 'red', fontSize: 13 }}>{formErrors.description}</p>
        </div>
        <div className="formField" style={{display:"flex",justifyContent:"center"}}>
          <button className="snip1457" style={{marginRight:"180px"}}>Add Roles</button>{' '}
        </div>
      </form>
    </div>
  );
};

export default AddRole;
