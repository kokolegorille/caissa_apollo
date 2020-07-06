// This element is used to wrap real element
// It also add a required class if needed, 
// to add an asterisk with css ::after

// It uses bootstrap 4 class markup

import React, { useContext } from 'react';

import FormContext from "./form_context";
import Input from "./input";
import Select from "./select";
import Textarea from "./textarea";

// Internal components
const Hint = ({hint}) => <small className="form-text text-muted">{hint}</small>;
const FieldError = ({error}) => <div className="invalid-feedback">{error}</div>;

const Field = (props) => {
  const { type, label, name, required, hint } = props;
  const { errors } = useContext(FormContext);
  const fieldErrors = errors ? errors[name] : null;

  const renderInput = () => {
    const inputClass = "form-control"
    switch (type) {
      case "select":
        return <Select className={inputClass} {...props} />
      case "textarea":
        return <Textarea className={inputClass} {...props} />
      default:
        return <Input className={inputClass} {...props} />
    }
  }

  const renderError = () => {
    if (!fieldErrors) { return }
    if (typeof fieldErrors === "string") {
      return <FieldError error={fieldErrors} />
    } else if (Array.isArray(fieldErrors)) {
      return fieldErrors.map(er => <FieldError key={er} error={er} />)
    }
  }

  const labelClassName = required ? "required" : ""

  return (
    <div className="form-group">
      { label && <label htmlFor={name} className={labelClassName}>{label}</label> }
      {renderInput()}
      { hint && <Hint hint={hint} /> }
      { renderError() }
    </div>
  );
};

export default Field;