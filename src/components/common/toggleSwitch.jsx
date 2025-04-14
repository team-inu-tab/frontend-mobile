import React from 'react';
import '@components/common/css/toggleSwitch.css';

function ToggleSwitch({ checked, onChange, className }) {
  return (
    <label className={`toggle-switch ${className}`}>
      <input 
        type="checkbox" 
        className= "toggle-checkbox"
        checked={checked}
        onChange={onChange}
      />
      <span className="toggle-slider"></span>
    </label>
  );
}

export default ToggleSwitch;