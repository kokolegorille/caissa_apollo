import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const QUERY = gql`
query Categories($limit: Int!, $offset: Int) {
  categories(limit: $limit, offset: $offset) {
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

const LIMIT = 25;

const Eco = () => {
  const [hasMore, setHasMore] = useState(true);
  const [open, setOpen] = useState([]);

  const { loading, error, data, fetchMore } = useQuery(QUERY, {
    variables: { limit: LIMIT }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  // console.log(data);

  if (data.categories.length < LIMIT && hasMore) {
    setHasMore(false);
  }

  // TODO: fen->png
  // TODO: games_by_zobrist_hash

  const renderCategories = categories => {
    if (categories.length <= 0) return <p>Records not found.</p>;
    return (
      <>
        <ul>
        {
          categories.map(category => (
            <li key={category.id}>
              {
                !open.includes(category.id) &&
                <button onClick={() => setOpen([category.id, ...open])}>+</button>
              }

              {
                open.includes(category.id) &&
                <>
                <button onClick={() => {
                  setOpen(open.filter(id => id != category.id))
                }}>-</button>
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
                </>
              }

              
              {category.volume} {category.code}
            </li>
          ))
        }
        </ul>
        {
          hasMore &&
          <button
            onClick={() => (
              fetchMore({
                variables: {
                  offset: categories.length
                },
                updateQuery: (previousResult, {fetchMoreResult}) => {
                  if (!fetchMoreResult) return previousResult;
                  if (fetchMoreResult.categories.length < LIMIT) {
                    setHasMore(false);
                  }
                  return {
                    categories: [
                      ...previousResult.categories,
                      ...fetchMoreResult.categories
                    ]
                  }
                }
              })
            )}
            >Load more...
          </button>
        }
      </>
    )
  }

  return (
    <>
    <h1>Eco</h1>
    {renderCategories(data.categories)}
    </>
  )
};

export default Eco;