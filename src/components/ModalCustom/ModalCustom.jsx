import React from "react";
import "./ModalCustom.css";

const ModalCustom = (props) => {
  const { title, content, setModalOpen, onConfirm } = props;
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button 
            type="button" 
            onClick={() => setModalOpen(false)}>
            X
          </button>
        </div>
        <div className="title">
          <h1>{title}</h1>
        </div>
        <div className="body">
          {content.map((x, index) => <p key={index} className="content">{x}</p>)}
        </div>
        <div className="footer">
          <button
            type="button"
            onClick={() => setModalOpen(false)}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button 
            type="button"
            onClick={() => {
              onConfirm();
              setModalOpen(false)
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalCustom;