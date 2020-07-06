import React from 'react';

const Fieldset = ({legend, children}) => {
  return (
    <fieldset>
      {
        legend && 
        <legend>{legend}</legend>
      }
      {children}
    </fieldset>
  );
};

export default Fieldset;