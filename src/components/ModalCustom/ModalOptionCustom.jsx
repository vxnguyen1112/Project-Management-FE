import React, { useState } from 'react';
import './ModalCustom.css';

const options = ['NEW_SPRINT', 'BACKLOG'];

const ModalOptionCustom = props => {
  const { setModalOpen, onConfirm } = props;
  const [option, setOption] = useState(options[1]);

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button type="button" onClick={() => setModalOpen(false)}>
            X
          </button>
        </div>
        <div className="title">
          <h1>Complete sprint</h1>
        </div>
        <div className="body">
          <p className="content">Please choise option</p>
          <div style={{ display: 'flex' }}>
            {options.map(value => (
              <div key={value} style={{ marginRight: 10 }}>
                <input
                  type="radio"
                  name="course"
                  id={value}
                  checked={option === value}
                  style={{ appearance: 'button' }}
                  onChange={() => setOption(value)}
                />
                <label htmlFor={value}>{value}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="footer">
          <button type="button" onClick={() => setModalOpen(false)} id="cancelBtn">
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm(option);
              setModalOpen(false);
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalOptionCustom;
