import gql from 'graphql-tag';

export const getMelodies = gql`
  query getMelodies {
    getMelodies {
      id
      name
      by
      createdAt
      level
    }
  }
`;

export const searchMelodies = gql`
  query searchMelodies($text: String!) {
    searchMelodies(text: $text) {
      id
      name
      by
      createdAt
      level
    }
  }
`;
