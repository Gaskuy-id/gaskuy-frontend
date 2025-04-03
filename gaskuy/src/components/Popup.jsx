import React, { useEffect, useState } from "react";
import { createPortal } from 'react-dom';

export const Popup = ({isOpen, onClose, children}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if(!isOpen) return null

  return createPortal(
    <div className="fixed flex w-screen h-screen top-0 left-0 items-center backdrop-blur-md place-content-center" onClick={onClose}>
      <div className="fixed w-screen h-screen bg-black opacity-50 z-10"></div>
      <div className="w-fit h-fit z-20" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  );
}
