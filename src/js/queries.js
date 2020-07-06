import { gql } from "apollo-boost";

export const GAMES = gql`
  query gamesQuery(
    $offset: Int!
    $limit: Int!
    $filter: GameFilter!
    $order: SortOrder!
  ) {
    games(
      offset: $offset
      limit: $limit
      order: $order
      filter: $filter
    ) {
      id
      internalId
      pgn
      whitePlayer {
        firstName
        lastName
      }
      blackPlayer {
        firstName
        lastName
      }
      whiteElo
      blackElo
      event
      site
      round
      result
      year
      month
      day
    }
  }
`;

export const GAME_BY_ID = gql`
  query gameByIdQuery($id: ID!) {
    game(id: $id) {
      id
      internalId
      gameInfo
      pgn
      whitePlayer {
        firstName
        lastName
      }
      blackPlayer {
        firstName
        lastName
      }
      whiteElo
      blackElo
      event
      site
      round
      result
      year
      month
      day
      positions {
        move
        moveIndex
        fen
        zobristHash
      }
    }
  }
`;

export const ECO = gql`
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