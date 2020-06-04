import gql from 'graphql-tag';

export const getMelodies = gql`
  query getMelodies($text: String, $skip: Int, $first: Int) {
    getMelodies(text: $text, skip: $skip, first: $first) {
      melodies {
        id
        name
        by
        createdAt
        level
      }
      count
    }
  }
`;
