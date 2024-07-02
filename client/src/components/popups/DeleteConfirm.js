import React from 'react';
import '../../assets/styles/DeleteConfirm.css';

const DeleteConfirm = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog-container">
        <h3>Confirm Delete</h3>
        <p>Are you sure you want to delete this booking?</p>
        <div className="dialog-actions">
          <button onClick={onConfirm} className="dialog-button confirm">Yes</button>
          <button onClick={onClose} className="dialog-button cancel">No</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirm;
