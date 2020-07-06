import React, { useContext } from 'react';
import FormContext from "./form_context";
import { buildInputClass } from "./helpers";

const Textarea = ({name, validationRules, ...otherProps}) => {
  const {fields, actions} = useContext(FormContext);
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
    <textarea 
      onChange={handleChange}
      value={value || ""} 
      {...otherProps}
      className={className}
      />
  );
};

export default Textarea;
