import gql from 'graphql-tag';

export const createMelody = gql`
  mutation createMelody($name: String!, $by: String!) {
    createMelody(name: $name, by: $by) {
      id
      name
      by
      createdAt
    }
  }
`;

export const getMelodies = gql`
  query getMelodies {
    user {
      melodies {
        id
        name
        by
        createdAt
        level
      }
    }
  }
`;
