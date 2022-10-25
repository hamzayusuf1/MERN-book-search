const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Books {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }
  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Books]
  }
  type Auth {
    token: ID!
    user: User
  }
  type Query {
    me: User
    users: [User]
    user(id: ID!): User
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    removeBook(bookId: String!): User
  }
`;
