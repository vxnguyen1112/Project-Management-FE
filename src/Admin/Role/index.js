/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-nested-ternary */
import React from 'react';
import './styles.css';

const Role = () => {
 
  return (
    <div className="listproject">
      <div className="main" style={{ padding: '30px 70px' }}>
        <div className="container">
        <div className="item" >
            <p style={{fontStyle:"oblique",textAlign:'center',fontSize:'20px',fontWeight:'800'}}>Admin</p>
            <div style={{ display: 'flex' }}>
                <p className='item-p'>Create : </p>
                <input
                  type="checkbox"
                  className="checkbox-role"
                  style={{ marginLeft: '110px', marginTop: '3px' }}
                  checked
                 
                />
              </div>
              <div style={{ display: 'flex' }}>
                <p className='item-p'>Update : </p>
                <input
                  type="checkbox"
                  className="checkbox-role"
                  style={{ marginLeft: '110px', marginTop: '3px' }}
                  checked
                  
                />
              </div>
              <div style={{ display: 'flex' }}>
                <p className='item-p'>Get: </p>
                <input
                  type="checkbox"
                  className="checkbox-role"
                  style={{ marginLeft: '110px', marginTop: '3px' }}
                  checked
                 
                />
              </div>
              <div style={{ display: 'flex' }}>
                <p className='item-p'>Remove:   </p>
                <input
                  type="checkbox"
                  className="checkbox-role"
                  style={{ marginLeft: '110px', marginTop: '3px' }}
                  checked
                  
                />
              </div>
            </div>



            <div className="item" >
            <p style={{fontStyle:"oblique",textAlign:'center',fontSize:'20px',fontWeight:'800'}}>Member</p>
            <div style={{ display: 'flex' }}>
                <p className='item-p'>Create : </p>
                <input
                  type="checkbox"
                  className="checkbox-role"
                  style={{ marginLeft: '110px', marginTop: '3px' }}
                  checked
                 
                />
              </div>
              <div style={{ display: 'flex' }}>
                <p className='item-p'>Update : </p>
                <input
                  type="checkbox"
                  className="checkbox-role"
                  style={{ marginLeft: '110px', marginTop: '3px' }}
                  checked
                  
                />
              </div>
              <div style={{ display: 'flex' }}>
                <p className='item-p'>Get: </p>
                <input
                  type="checkbox"
                  className="checkbox-role"
                  style={{ marginLeft: '110px', marginTop: '3px' }}
                  checked
                 
                />
              </div>
              <div style={{ display: 'flex' }}>
                <p className='item-p'>Remove:   </p>
                <input
                  type="checkbox"
                  className="checkbox-role"
                  style={{ marginLeft: '110px', marginTop: '3px' }}
                  checked
                  
                />
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Role;
