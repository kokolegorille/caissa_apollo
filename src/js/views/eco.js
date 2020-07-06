import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";

import { ECO } from "../queries";

const LIMIT = 500;

// Internal components

const Category = ({category, isOpen, handleClick}) => (
  <div className="card">
    <div className="card-body">
      {
        isOpen ?
          <>
            <button 
              className="btn btn-sm btn-light"
              onClick={handleClick}>-</button>
            <ul className="list-unstyled">
            {
              category.sub_categories.map(subCategory => 
                <SubCategory key={subCategory.id} subCategory={subCategory} />
              )
            }
            </ul>
          </> :
          <button 
            className="btn btn-sm btn-light"
            onClick={handleClick}>+</button>
      }
      {category.volume} {category.code}
    </div>
  </div>
)

const SubCategory = ({subCategory}) => (
  <li>
    {subCategory.code}&nbsp;
    {subCategory.description}&nbsp;
    {subCategory.pgn}
    {subCategory.zobrist_hash}
  </li>
)

const Eco = () => {
  // const [hasMore, setHasMore] = useState(true);
  const [open, setOpen] = useState([]);

  const { loading, error, data, fetchMore } = useQuery(ECO, {
    variables: { limit: LIMIT }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  // console.log(data);

  // This does not detect EOL if length is equal to LIMIT
  // if (data.categories.length < LIMIT && hasMore) { setHasMore(false) }

  // LOAD ALL CATEGORIES ON START...
  const hasMore = false;

  // TODO: fen->png
  // TODO: games_by_zobrist_hash

  

  const renderCategories = categories => {
    if (categories.length <= 0) return <p>Records not found.</p>;

    const grouped_categories = categories.reduce((acc, cat) => {
      acc[cat.volume] = [...acc[cat.volume] || [], cat];
      return acc;
    }, {})

    // console.log("GROUPED: ", grouped_categories)

    return (
      <>
        <div className="d-flex flex-wrap">
        {
          Object.entries(grouped_categories).map(
            ([key, value]) => (
              <div key={key}>
                <h3>{key}</h3>
                <div className="d-flex flex-wrap mb-4">
                  {
                    value.map(category => {
                      const isOpen = open.includes(category.id);
                      return (
                        <Category 
                          key={category.id} 
                          isOpen={isOpen}
                          handleClick={isOpen ? 
                            () => setOpen(open.filter(id => id != category.id)) :
                            () => setOpen([category.id, ...open])
                          }
                          category={category} />
                      )
                    })
                  }
                </div>
              </div>
            )
          )
        }
        </div>
        {
          hasMore &&
          <button
            className="btn btn-light"
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


// import React, { useState } from "react";
// import { useQuery } from "@apollo/react-hooks";
// import gql from "graphql-tag";

// const QUERY = gql`
// query Categories($limit: Int!, $offset: Int) {
//   categories(limit: $limit, offset: $offset) {
//     id
//     volume
//     code
//     sub_categories(order: DESC) {
//       id
//       code
//       description
//       pgn
//       fen
//       zobrist_hash
//     }
//   }
// }
// `

// const LIMIT = 25;

// // Internal components

// const Category = ({category, isOpen, handleClick}) => (
//   <li>
//     {
//       !isOpen &&
//       <button 
//         className="btn btn-sm btn-light"
//         onClick={handleClick}>
//         +
//       </button>
//     }
//     {
//       isOpen &&
//       <>
//       <button 
//         className="btn btn-sm btn-light"
//         onClick={handleClick}>-</button>
//       <ul>
//       {
//         category.sub_categories.map(subCategory => (
//           <SubCategory key={subCategory.id} subCategory={subCategory} />
//         ))
//       }
//       </ul>
//       </>
//     }
//     {category.volume} {category.code}
//   </li>
// )

// const SubCategory = ({subCategory}) => (
//   <li>
//     {subCategory.code}&nbsp;
//     {subCategory.description}&nbsp;
//     {subCategory.pgn}&nbsp;
//     {subCategory.zobrist_hash}
//   </li>
// )

// const Eco = () => {
//   const [hasMore, setHasMore] = useState(true);
//   const [open, setOpen] = useState([]);

//   const { loading, error, data, fetchMore } = useQuery(QUERY, {
//     variables: { limit: LIMIT }
//   });

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error :(</p>;

//   // console.log(data);

//   if (data.categories.length < LIMIT && hasMore) {
//     setHasMore(false);
//   }

//   // TODO: fen->png
//   // TODO: games_by_zobrist_hash

//   const renderCategories = categories => {
//     if (categories.length <= 0) return <p>Records not found.</p>;
//     return (
//       <>
//         <ul>
//         {
//           categories.map(category => {
//             const isOpen = open.includes(category.id);
//             return (
//               <Category 
//                 key={category.id} 
//                 isOpen={isOpen}
//                 handleClick={isOpen ? 
//                   () => setOpen(open.filter(id => id != category.id)) :
//                   () => setOpen([category.id, ...open])
//                 }
//                 category={category} />
//             )
//           })
//         }
//         </ul>
//         {
//           hasMore &&
//           <button
//             className="btn btn-light"
//             onClick={() => (
//               fetchMore({
//                 variables: {
//                   offset: categories.length
//                 },
//                 updateQuery: (previousResult, {fetchMoreResult}) => {
//                   if (!fetchMoreResult) return previousResult;
//                   if (fetchMoreResult.categories.length < LIMIT) {
//                     setHasMore(false);
//                   }
//                   return {
//                     categories: [
//                       ...previousResult.categories,
//                       ...fetchMoreResult.categories
//                     ]
//                   }
//                 }
//               })
//             )}
//             >Load more...
//           </button>
//         }
//       </>
//     )
//   }

//   return (
//     <>
//     <h1>Eco</h1>
//     {renderCategories(data.categories)}
//     </>
//   )
// };

// export default Eco;





// import React, { useState } from "react";
// import { useQuery } from "@apollo/react-hooks";
// import gql from "graphql-tag";

// const QUERY = gql`
// query Categories($limit: Int!, $offset: Int) {
//   categories(limit: $limit, offset: $offset) {
//     id
//     volume
//     code
//     sub_categories(order: DESC) {
//       id
//       code
//       description
//       pgn
//       fen
//       zobrist_hash
//     }
//   }
// }
// `

// const LIMIT = 25;

// // Internal components

// const Category = category => (
//   <li>
//     {
//       !open.includes(category.id) &&
//       <button 
//         className="btn btn-sm btn-light"
//         onClick={() => setOpen([category.id, ...open])}>
//         +
//       </button>
//     }
//     {
//       open.includes(category.id) &&
//       <>
//       <button 
//         className="btn btn-sm btn-light"
//         onClick={() => {
//         setOpen(open.filter(id => id != category.id))
//       }}>-</button>
//       <ul>
//       {
//         category.sub_categories.map(subCategory => (
//           <SubCategory key={subCategory.id} subCategory={subCategory} />
//         ))
//       }
//       </ul>
//       </>
//     }
//     {category.volume} {category.code}
//   </li>
// )

// const SubCategory = subCategory => (
//   <li>
//     {subCategory.code}&nbsp;
//     {subCategory.description}&nbsp;
//     {subCategory.pgn}&nbsp;
//     {subCategory.zobrist_hash}
//   </li>
// )

// const Eco = () => {
//   const [hasMore, setHasMore] = useState(true);
//   const [open, setOpen] = useState([]);

//   const { loading, error, data, fetchMore } = useQuery(QUERY, {
//     variables: { limit: LIMIT }
//   });

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error :(</p>;

//   // console.log(data);

//   if (data.categories.length < LIMIT && hasMore) {
//     setHasMore(false);
//   }

//   // TODO: fen->png
//   // TODO: games_by_zobrist_hash

//   const renderCategories = categories => {
//     if (categories.length <= 0) return <p>Records not found.</p>;
//     return (
//       <>
//         <ul>
//         {
//           categories.map(category => (
//             <li key={category.id}>
//               {
//                 !open.includes(category.id) &&
//                 <button 
//                   className="btn btn-sm btn-light"
//                   onClick={() => setOpen([category.id, ...open])}>
//                   +
//                 </button>
//               }

//               {
//                 open.includes(category.id) &&
//                 <>
//                 <button 
//                   className="btn btn-sm btn-light"
//                   onClick={() => {
//                   setOpen(open.filter(id => id != category.id))
//                 }}>-</button>
//                 <ul>
//                 {
//                   category.sub_categories.map(sub_category => (
//                     <li key={sub_category.id}>
//                       {sub_category.code}&nbsp;
//                       {sub_category.description}&nbsp;
//                       {sub_category.pgn}&nbsp;
//                       {sub_category.zobrist_hash}
//                     </li>
//                   ))
//                 }
//                 </ul>
//                 </>
//               }

              
//               {category.volume} {category.code}
//             </li>
//           ))
//         }
//         </ul>
//         {
//           hasMore &&
//           <button
//             className="btn btn-light"
//             onClick={() => (
//               fetchMore({
//                 variables: {
//                   offset: categories.length
//                 },
//                 updateQuery: (previousResult, {fetchMoreResult}) => {
//                   if (!fetchMoreResult) return previousResult;
//                   if (fetchMoreResult.categories.length < LIMIT) {
//                     setHasMore(false);
//                   }
//                   return {
//                     categories: [
//                       ...previousResult.categories,
//                       ...fetchMoreResult.categories
//                     ]
//                   }
//                 }
//               })
//             )}
//             >Load more...
//           </button>
//         }
//       </>
//     )
//   }

//   return (
//     <>
//     <h1>Eco</h1>
//     {renderCategories(data.categories)}
//     </>
//   )
// };

// export default Eco;