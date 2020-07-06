import React from "react";

import gameFilterSchema from "../schemas/game_filter_schema";
import { Form, Fieldset, Field, Submit } from "../components/form_builder";

const Filter = ({submit}) => {
  return (
    <Form 
      callback={submit}
      schema={gameFilterSchema} 
      initialState={{}}
      errors={{}}>
      <Fieldset legend="filter games">
        <Field 
          name="player" 
          label="Player Name" 
          validationRules={{}}
          type="text" />
        <Field 
          name="zobristHash" 
          label="Zobrist Hash" 
          validationRules={{}}
          type="text" />
      </Fieldset>
      <Submit label="Submit" className="mt-4 btn btn-light" />
    </Form>
  )
}

export default Filter;