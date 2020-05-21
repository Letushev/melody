import gql from 'graphql-tag';

export const user = gql`
  query user {
    user {
      nickname,
      image
    }
  }
`;

export const changeAvatar = gql`
  mutation addUserImage($image: String!) {
    addUserImage(image: $image) {
      image
    }
  }
`;
