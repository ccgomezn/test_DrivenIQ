const User = require("../../models/user");
const Friend = require("../../models/friend");

const userResolver = {
  users: async ({ page, pageSize }) => {
    return await User.findAllPaginated(page, pageSize);
  },
  createUser: async ({ input }) => {
    return await User.create(input);
  },
  updateUser: async ({ id, input }) => {
    return await User.update(id, input);
  },
  addFriend: async ({ userId, friendId }) => {
    if (userId === friendId) {
      throw new Error("Cannot add oneself as a friend.");
    }
    return await Friend.addFriend(userId, friendId);
  },
};

module.exports = userResolver;
