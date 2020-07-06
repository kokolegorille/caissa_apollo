import React from 'react';

import useForm from "./use_form";
import FormContext from "./form_context";

const Form = (props) => {
  const {
    schema, callback, children, resetOnSubmit, 
    initialState = null, errors = {},
    ...otherProps
  } = props;

  const [state, actions] = useForm(schema, initialState);
  const { fields } = state
  const names = Object.keys(schema);

  const onSubmit = () => {
    callback(_sanitizeState(fields));
    if (resetOnSubmit) actions.reset();
  }

  // Extract values only from state
  const _sanitizeState = fields => (
    names.reduce((acc, key) => {
      acc[key] = fields[key].value;
      return acc;
    }, {})
  );

  const value = {
    fields, 
    errors, 
    actions: {...actions, onSubmit}
  };

  return (
    <FormContext.Provider value={value}>
      <form {...otherProps}>
        {children}
      </form>
    </FormContext.Provider>
  );
};

export default Form;
