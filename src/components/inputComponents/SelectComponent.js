import React from 'react';

const SelectComponent = (props) => {
  const handleChange = (e) => {
    props.handleChange(e.target.name, e.target.value, 'selectcomponent');
  };

  return (
    <select
      className='form-select mt-1'
      name={props.name}
      id={props.id}
      value={props.value}
      onChange={handleChange}
    >
      <option> {props.label}</option>
      {props.options.map((option, index) => (
        <option key={option.id} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectComponent;
