import React from "react";



const FormRadio = ({ name, value , handleChange , error }) => {  
  
  const radio = value.map((val) => (
    <div key={val}>
      <input
        type="radio"
        id={val}
        name={name}
        value={val}
        onChange={handleChange}
      />
      <label htmlFor={val}>{val} </label>
    </div>
  ));
  return (
    <div>
      {radio}
      {error && <div>{error}</div>}
    </div>
  );
};

export default FormRadio;
