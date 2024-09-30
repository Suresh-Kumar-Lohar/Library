import React from 'react';
import './InputField.css'

const InputField = ({ label, type, name, value, onChange, error }) => {
  return (
    <div className="input-group">
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={error ? "error" : ""}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default InputField;
