const { createTestClient } = require('apollo-server-testing');
const { ApolloServer, gql } = require('apollo-server-express');
const typeDefs = require('../../src/graphql/schemas/userSchema');
const resolvers = require('./userResolverTest');

// Setup Apollo Server for testing
const server = new ApolloServer({ typeDefs, resolvers });
const { query, mutate } = createTestClient(server);

describe('GraphQL integration tests', () => {
  it('creates a new user', async () => {
    const CREATE_USER = gql`
      mutation CreateUser($input: UserInput!) {
        createUser(input: $input) {
          id
          email
          firstName
          lastName
          gender
          imageUrl
          createdAt
        }
      }
    `;

    const result = await mutate({
      mutation: CREATE_USER,
      variables: {
        input: {
          email: "newuser@example.com",
          firstName: "New",
          lastName: "User",
          gender: "Non-binary",
          imageUrl: "http://example.com/newuser.png"
        }
      }
    });
    expect(result.data.createUser).toHaveProperty('id');
    expect(result.data.createUser.email).toBe('newuser@example.com');
  });

  it('fetches users with pagination', async () => {
    const GET_USERS = gql`
      query GetUsers($page: Int, $pageSize: Int) {
        users(page: $page, pageSize: $pageSize) {
          id
          email
          firstName
          lastName
          gender
          imageUrl
          createdAt
        }
      }
    `;
  
    const result = await query({
      query: GET_USERS,
      variables: {
        page: 1,
        pageSize: 10
      }
    });
  
    expect(result.data.users).toBeInstanceOf(Array);
  });

  it('updates a user', async () => {
    const UPDATE_USER = gql`
      mutation UpdateUser($id: ID!, $input: UserUpdateInput!) {
        updateUser(id: $id, input: $input) {
          id
          email
          firstName
          lastName
          gender
          imageUrl
          createdAt
        }
      }
    `;
  
    const result = await mutate({
      mutation: UPDATE_USER,
      variables: {
        id: "1",
        input: {
          firstName: "UpdatedName"
        }
      }
    });
  
    expect(result.data.updateUser.firstName).toBe("UpdatedName");
  });

  it('adds a friend', async () => {
    const ADD_FRIEND = gql`
      mutation AddFriend($userId: ID!, $friendId: ID!) {
        addFriend(userId: $userId, friendId: $friendId)
      }
    `;
  
    const result = await mutate({
      mutation: ADD_FRIEND,
      variables: {
        userId: "1",  
        friendId: "2"
      }
    });
  
    expect(result.data.addFriend).toBe(true);
  });
  
  
});
