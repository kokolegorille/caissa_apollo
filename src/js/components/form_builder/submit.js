import React, { useContext } from 'react';
import FormContext from "./form_context";

const Submit = ({label, ...otherProps}) => {
  const { actions } = useContext(FormContext);
  const disabled = !actions.isValid();

  const handleClick = e => {
    e.preventDefault();
    actions.onSubmit && actions.onSubmit();
  }

  return (
    <button 
      disabled={disabled}
      onClick={handleClick} {...otherProps}>
      {label}
    </button>
  );
};

export default Submit;
