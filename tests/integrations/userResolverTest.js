const User = require('../../src/models/user');
const Friend = require('../../src/models/friend');
const mainResolver = require('../../src/graphql/resolvers/userResolver');

const userResolver = {
  Query: {
    users: async (_, { page, pageSize }) => {
      return mainResolver.users({ page, pageSize })
    },
  },
  Mutation: {
    createUser: async (_, { input }) => {
      return mainResolver.createUser({ input })
    },
    updateUser: async (_, { id, input }) => {
      return mainResolver.updateUser({ id, input })
    },
    addFriend: async (_, { userId, friendId }) => {
      return mainResolver.addFriend({ userId, friendId })
    }
  }
};

module.exports = userResolver;
