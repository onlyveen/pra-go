// components/Modal.js
import Image from "next/image";
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
        <img
          src={photo.src.large}
          alt={photo.alt}
          className="image"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default Modal;
