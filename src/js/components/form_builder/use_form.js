import { useReducer } from 'react';

import validation from './validation';

const SET_FIELDS = "SET_FIELDS";
const RESET = "RESET";

const defaultState = {
  fields: {}, // value, valid, touched
}

const reducer = (state, action) => {
  let newState;

  switch (action.type) {
    case SET_FIELDS:
      newState = {...state, fields: action.payload}
      break;

    case RESET:
      newState = action.payload
      break;

    default: 
      newState = Object.assign({}, state);
      break;
  };

  // console.log(state, action, newState);

  return newState;
};

// Create initial state
const loadState = (obj, schema) => {
  const fields = Object.assign({}, schema);

  Object.keys(obj)
      .filter((key) => obj[key])
      .forEach((key) => {
        fields[key].value = obj[key];

        // validation should com from fields
        fields[key].valid = validation(
            obj[key],
            schema[key].validationRules,
        );
        fields[key].touched = false;
      });

  return fields;
}; 

let state, dispatch;

const useForm = (schema, initialState = defaultState) => {
  const startFields = loadState(initialState, schema);
  const startState = {fields: startFields};

  [state, dispatch] = useReducer(reducer, startState);

  const { fields } = state;

  const onChange = (name, value, validationRules) => {
    const newFields = {
      ...fields, 
      [name]: {
        ...fields[name],
        value,
        valid: validation(
          value,
          validationRules,
        ),
        touched: true,
      },
    }
    dispatch({type: SET_FIELDS, payload: newFields});
  }

  const reset = () => dispatch({type: RESET, payload: startState});

  const isValid = () => Object.keys(schema)
    .map(name => fields[name] && fields[name].valid)
    .every(v => v);

  return [
    state, 
    { onChange, reset, isValid }
  ];
};

export default useForm;