import { gql } from "@apollo/client";

export const GET_ME = gql`
  query getMe {
    me {
      _id
      username
      bookCount
      savedBooks {
        authors
        description
        title
        bookId
        image
        link
      }
    }
  }
`;

export const ALL_USERS = gql`
  query users {
    users {
      _id
      username
      bookCount
      savedBooks {
        authors
        description
        title
        bookId
        image
        link
      }
    }
  }
`;
