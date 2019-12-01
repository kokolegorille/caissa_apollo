import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const QUERY = gql`
query Categories($limit: Int!) {
  categories(limit: $limit) {
    id
    volume
    code
    sub_categories(order: DESC) {
      id
      code
      description
      pgn
      fen
      zobrist_hash
    }
  }
}
`

const Eco = () => {
  const { loading, error, data } = useQuery(QUERY, {
    variables: { limit: 25 }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log(data);

  // TODO: fen->png
  // TODO: games_by_zobrist_hash

  return (
    <>
    <h1>Eco</h1>
    <ul>
    {
      data.categories.map(category => (
        <li key={category.id}>
          {category.volume} {category.code}
          <ul>
          {
            category.sub_categories.map(sub_category => (
              <li key={sub_category.id}>
                {sub_category.code}&nbsp;
                {sub_category.description}&nbsp;
                {sub_category.pgn}&nbsp;
                {sub_category.zobrist_hash}
              </li>
            ))
          }
          </ul>
        </li>
      ))
    }
    </ul>
    </>
  )
};

export default Eco;