import React from "react";

const FormInput = ({name , label , value , error , type , handleChange}) => {
  return (
    <div>
      <label htmlFor={name} >{label}</label>
      <input
        autoFocus
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
      />
      {error && <div>{error}</div>}
    </div>
  );
};

export default FormInput;
