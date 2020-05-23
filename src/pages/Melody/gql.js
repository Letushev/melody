import gql from 'graphql-tag';

export const getMelody = gql`
  query getMelody($id: ID!) {
    getMelody(id: $id) {
      id
      name
      by
      createdAt
      createdBy {
        id
        nickname
        image
      }
      level
      public
      tabs
    }
  }
`;

export const getUserId = gql`
  query getUserId {
    user {
      id
    }
  }
`;

export const updateMelody = gql`
  mutation updateMelody($id: ID!, $name: String, $by: String, $level: String, $public: Boolean) {
    updateMelody(id: $id, name: $name, by: $by, level: $level, public: $public) {
      id
    }
  }
`;

export const deleteMelody = gql`
  mutation deleteMelody($id: ID!) {
    deleteMelody(id: $id) {
      id
    }
  }
`;

export const updateTabs = gql`
  mutation updateTabs($id: ID!, $tabs: String!) {
    editMelodyTabs(id: $id, tabs: $tabs) {
      id
    }
  }
`;
