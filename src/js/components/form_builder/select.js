import React, { useContext } from 'react';
import FormContext from "./form_context";
import { buildInputClass } from "./helpers";

const Select = ({name, options, validationRules = null, ...otherProps}) => {
  const { fields, actions } = useContext(FormContext);
  
  // This should not happen, 
  // unless schema does not define input key
  if (!fields[name]) { return null }

  const { value, valid, touched } = fields[name];

  const handleChange = e => {
    e.persist();
    const value = e.target.value ? e.target.value : "";
    actions.onChange(name, value, validationRules)
  }
  const className = otherProps.className ?
    buildInputClass(valid, touched, otherProps.className) :
    buildInputClass(valid, touched);

  return (
    <select
      onChange={handleChange}
      value={value || ""} 
      {...otherProps}
      className={className}>
      {
        options.map(option => {
          const { label, value, ...others } = option;
          return (
            <option
              key={label}
              value={value}
              {...others} >
              {option.label}
            </option>)
        })
      }
    </select>
  );
};

export default Select;
