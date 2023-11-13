exports.up = (pgm) => {
  pgm.createTable('friends', {
    userId: { type: 'integer', notNull: true, references: '"users"', onDelete: 'CASCADE' },
    friendId: { type: 'integer', notNull: true, references: '"users"', onDelete: 'CASCADE' }
  });

  pgm.addConstraint('friends', 'unique_user_friend', {
    unique: ['userId', 'friendId']
  });

  pgm.createIndex('friends', ['userId', 'friendId'], { unique: true });
};

exports.down = (pgm) => {
  pgm.dropTable('friends');
};
