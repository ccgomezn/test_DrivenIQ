class Friend {
  constructor(userId, friendId) {
    this.userId = userId;
    this.friendId = friendId;
  }

  static async addFriend(userId, friendId) {
    new Friend(userId, friendId);
    return true;
  }
}

module.exports = Friend;
