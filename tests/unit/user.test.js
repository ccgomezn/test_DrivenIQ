// user.test.js
const User = require('../../src/models/user');
const db = require('../../src/db'); 

jest.mock('../../src/db');

describe('User model', () => {
  beforeEach(() => {
    db.query.mockClear();
  });

  it('creates a new user', async () => {
    const mockUser = {
      id: '1', 
      email: 'test@example.com', 
      firstName: 'Test', 
      lastName: 'User', 
      gender: 'Male', 
      imageUrl: 'http://example.com/image.png', 
      createdAt: new Date().toISOString()
    };
    db.query.mockResolvedValueOnce({ rows: [mockUser] });

    const user = await User.create(mockUser);
    expect(user).toBeInstanceOf(User);
    expect(user.email).toBe(mockUser.email);
  });

  it('finds a user by id', async () => {
    const mockUser = {
      id: '2',
      email: 'jane@example.com',
      firstName: 'Test', 
      lastName: 'User', 
      gender: 'Male', 
      imageUrl: 'http://example.com/image.png', 
      createdAt: new Date().toISOString()
    };
    db.query.mockResolvedValueOnce({ rows: [mockUser] });

    const user = await User.findById('2');
    expect(user).toBeInstanceOf(User);
    expect(user.id).toBe('2');
  });

  it('fetches users with pagination', async () => {
    const mockUsers = [
      {
        id: '2',
        email: 'jane@example.com',
        firstName: 'Test', 
        lastName: 'User', 
        gender: 'Male', 
        imageUrl: 'http://example.com/image.png', 
        createdAt: new Date().toISOString()
      },
      {
        id: '1', 
        email: 'test@example.com', 
        firstName: 'Test', 
        lastName: 'User', 
        gender: 'Male', 
        imageUrl: 'http://example.com/image.png', 
        createdAt: new Date().toISOString()
      }
    ];
    db.query.mockResolvedValueOnce({ rows: mockUsers });

    let users = await User.findAllPaginated(1, 2);
    expect(users).toEqual(expect.arrayContaining(mockUsers.map(user => expect.any(User))));
    expect(users.length).toBe(2);
    expect(users[0].id).toBe('2');
    expect(users[1].id).toBe('1');
  });

  it('fetches users with correct pagination parameters', async () => {
    db.query.mockResolvedValueOnce({ rows: [] }); 
  
    const pageSize = 1;
    const page = 1;
    const offset = (page - 1) * pageSize;
  
    await User.findAllPaginated(page, pageSize);
  
    expect(db.query).toHaveBeenCalledWith('SELECT * FROM users LIMIT $1 OFFSET $2', [pageSize, offset]);
  });

  it('updates a user', async () => {
    const user = {
      id: '1', 
      email: 'test@example.com', 
      first_name: 'New', 
      last_name: 'User', 
      gender: 'Male', 
      image_url: 'http://example.com/image.png', 
      created_at: new Date().toISOString(),
    };
    db.query.mockResolvedValueOnce({ rows: [user] });

    const result = await User.update('1', { firstName: 'New' });
    expect(result).toBeInstanceOf(User);
    expect(result.firstName).toBe('New');
  });
});