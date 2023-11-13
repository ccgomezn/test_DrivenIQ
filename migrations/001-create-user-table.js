exports.up = (pgm) => {
  pgm.createTable('users', {
    id: 'id',
    email: { type: 'string', notNull: true },
    first_name: 'string',
    last_name: 'string',
    gender: 'string',
    image_url: 'string',
    created_at: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('users');
};
