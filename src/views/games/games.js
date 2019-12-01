import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Filter from "./filter";
import Table from "./table";

const QUERY = gql`
query Games($limit: Int!, $filter: GameFilter) {
  games(limit: $limit, filter: $filter) {
    id
    internalId
    whitePlayer {
      lastName
      firstName
    }
    whiteElo
    blackPlayer {
      lastName
      firstName
    }
    blackElo
    event
    round
    site
    year
    result
    pgn
  }
}
`

const Games = () => {
  const [filter, setFilter] = useState({});

  const { loading, error, data } = useQuery(QUERY, {
    variables: { limit: 25, filter: filter }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log(data);

  // Remove empty keys
  const sanitizeFilter = filter => {
    let copy = {};
    Object.keys(filter).forEach(key => {
      if (filter[key]) { copy[key] = filter[key] }
    });
    console.log(copy);
    return copy;
  }

  return (
    <>
      <h1>Games</h1>
      <Filter 
        submit={data => setFilter(sanitizeFilter(data))} 
        cancel={() => setFilter({})} 
        />
      <Table games={data.games} />
    </>
  )
};

export default Games;
