import React from 'react';

const InputComponent = (props) => {
  const handleChange = (e) => {
    props.handleChange(e.target.name, e.target.value);
  };
  return (
    <input
      type={props.type}
      className='form-control'
      id={props.id}
      name={props.name}
      onChange={handleChange}
      value={props.value}
      placeholder={props.placeholder}
      required={props.required}
    />
  );
};

export default InputComponent;
