// components/Modal.js
import React, { useEffect, useState } from "react";

const Modal = ({ photo, onClose }) => {
  const [loaded, setLoaded] = useState(false);

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
      <div className={loaded ? "modal loaded" : "modal"}>
        <span className="close" onClick={onClose}></span>
        {!loaded && <small className="loading fill-loading"></small>}
        <img
          src={photo.src.large2x}
          alt={photo.alt}
          className="image"
          loading="lazy"
          onLoad={() => setLoaded(true)}
        />
      </div>
    </div>
  );
};

export default Modal;
