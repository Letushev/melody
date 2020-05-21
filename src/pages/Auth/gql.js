import gql from 'graphql-tag';

export const signup =  gql`
  mutation signup($nickname: String!, $password: String!) {
    signup(nickname: $nickname, password: $password) {
      token
    }
  }
`;

export const login = gql`
  mutation login($nickname: String!, $password: String!) {
    login(nickname: $nickname, password: $password) {
      token
    }
  }
`;
