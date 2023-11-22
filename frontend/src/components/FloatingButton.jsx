import React from "react";
import * as FiIcons from "react-icons/fi";
import '../styles/FloatingButton.scss';

const FloatingButton = () => {
  return (
    <div className="floating-button">
      <div className="plus-icon"><FiIcons.FiPlus /></div>
    </div>
  );
};

export default FloatingButton;