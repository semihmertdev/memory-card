import React from 'react';

const WarningModal = ({ onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Warning</h2>
        <p>Please select a difficulty level before starting the game.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default WarningModal;
