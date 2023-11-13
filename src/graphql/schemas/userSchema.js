const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type User {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
    gender: String!
    imageUrl: String
    createdAt: String!
    friends: [User]
  }

  input UserInput {
    email: String!
    firstName: String!
    lastName: String!
    gender: String!
    imageUrl: String
  }

  input UserUpdateInput {
    email: String
    firstName: String
    lastName: String
    gender: String
    imageUrl: String
  }

  type Query {
    users(page: Int, pageSize: Int = 10): [User]
  }

  type Mutation {
    createUser(input: UserInput): User
    addFriend(userId: ID!, friendId: ID!): Boolean
    updateUser(id: ID!, input: UserUpdateInput): User
  }
`);

module.exports = schema;
