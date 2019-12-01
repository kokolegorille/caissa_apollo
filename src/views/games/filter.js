import React from "react";

import gameFilter from "../../schemas/game_filter";
import Form from "../../components/form/";

const Filter = ({submit, cancel}) => {
  return (
    <Form 
      schema={gameFilter} 
      callback={submit} 
      handleCancel={cancel} />
  )
}

export default Filter;