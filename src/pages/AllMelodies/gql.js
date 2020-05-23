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
