import React from "react";
import '../styles/FloatingButton.css'
import * as FiIcons from "react-icons/fi";

const FloatingButton = () => {
  return (
    <div className="floating-button">
    <div className="plus-icon"><FiIcons.FiPlus /></div>
    </div>
  );
};

export default FloatingButton;