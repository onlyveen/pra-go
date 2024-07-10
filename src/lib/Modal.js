// components/Modal.js
import React, { useEffect } from "react";

const Modal = ({ photo, onClose }) => {
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.id === "modal-overlay") {
        onClose();
      }
    };

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [onClose]);

  return (
    <div id="modal-overlay" className="overlay">
      <div className="modal">
        <span className="close" onClick={onClose}></span>
        <img src={photo.src.original} alt={photo.alt} className="image" />
      </div>
    </div>
  );
};

export default Modal;
