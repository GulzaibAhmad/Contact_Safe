const client = require('../config/dbConnection');
const { v4: uuidv4 } = require('uuid');

// Create the users table if it doesn't exist
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
  );
`;


client.query(createTableQuery)
  .then(() => {
    console.log('Users table created');
  })
  .catch((error) => {
    console.error('Error creating users table:', error);
  });

// User model functions
const createUser = async (username, email, password) => {
  const id = uuidv4(); // Generate a UUID for the id field
  const query = {
    text: 'INSERT INTO users(id, username, email, password) VALUES($1, $2, $3, $4) RETURNING *',
    values: [id, username, email, password]
  };

  try {
    console.log('Executing createUser query:', query);
    const result = await client.query(query);
    return result.rows[0];
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error(`An error occurred while creating the user: ${error.message}`);
  }
};

const getUserByEmail = async (email) => {
  const query = {
    text: 'SELECT * FROM users WHERE email = $1',
    values: [email]
  };

  try {
    const result = await client.query(query);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
  getUserByEmail
};
