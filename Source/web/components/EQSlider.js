import React from 'react';

const EqSlider = ({ label, value, onChange }) => (
  <div className="eq-slider">
    <label>{label}</label>
    <input
      type="range"
      min="0"
      max="100"
      value={value}
      onChange={onChange}
    />
  </div>
);

export default EqSlider;