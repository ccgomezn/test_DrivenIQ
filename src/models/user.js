const db = require("../db"); // Import the database connection

class User {
  constructor(id, email, firstName, lastName, gender, imageUrl, createdAt) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.imageUrl = imageUrl;
    this.createdAt = createdAt;
  }

  static async create({ email, firstName, lastName, gender, imageUrl }) {
    const existingUser =  await db.query("SELECT * FROM users WHERE email = $1", [email]);
    
    if (existingUser.rows && existingUser.rows.length > 0) {
      throw new Error('Email already exists.');
    }

    const result = await db.query(
      "INSERT INTO users (email, first_name, last_name, gender, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [email, firstName, lastName, gender, imageUrl]
    );
    const newUser = result.rows[0];
    return new User(
      newUser.id,
      newUser.email,
      newUser.first_name,
      newUser.last_name,
      newUser.gender,
      newUser.image_url,
      newUser.created_at
    );
  }

  static async findById(id) {
    const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    const user = result.rows[0];
    return new User(
      user.id,
      user.email,
      user.first_name,
      user.last_name,
      user.gender,
      user.image_url,
      user.created_at
    );
  }

  static async findAllPaginated(page = 1, pageSize = 10) {
    const pageNum = parseInt(page, 10);
    const size = parseInt(pageSize, 10);
    const offset = (pageNum - 1) * size;
    const result = await db.query("SELECT * FROM users LIMIT $1 OFFSET $2", [
      size,
      offset,
    ]);
    return result.rows.map(
      (user) =>
        new User(
          user.id,
          user.email,
          user.first_name,
          user.last_name,
          user.gender,
          user.image_url,
          user.created_at
        )
    );
  }

  static async update(id, updateData) {
    // Convert updateData keys from camelCase to snake_case
    const updateDataSnakeCase = Object.entries(updateData).reduce(
      (acc, [key, value]) => {
        const snakeKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
        acc[snakeKey] = value;
        return acc;
      },
      {}
    );
    // Validate field names against validFields
    const validFields = [
      "email",
      "first_name",
      "last_name",
      "gender",
      "image_url",
    ];
    Object.keys(updateDataSnakeCase).forEach((field) => {
      if (!validFields.includes(field)) {
        throw new Error(`Invalid field name: ${field}`);
      }
    });

    // Build and execute the SQL query
    let query = "UPDATE users SET ";
    query += Object.keys(updateDataSnakeCase)
      .map((field, index) => `"${field}" = $${index + 2}`)
      .join(", ");
    query += " WHERE id = $1 RETURNING *";
    const values = Object.values(updateDataSnakeCase);
    const result = await db.query(query, [id, ...values]);
    const updatedUser = result.rows[0];
    return new User(
      updatedUser.id,
      updatedUser.email,
      updatedUser.first_name,
      updatedUser.last_name,
      updatedUser.gender,
      updatedUser.image_url,
      updatedUser.created_at
    );
  }
}

module.exports = User;
