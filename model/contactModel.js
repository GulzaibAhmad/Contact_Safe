const db = require('../config/dbConnection');
const { v4: uuidv4 } = require('uuid');

// Create the 'contacts' table (run this once)
db.query(`
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone BIGINT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP
);
`)
  .then(() => {
    console.log('Contacts table created');
  })
  .catch(err => {
    console.error('Error creating contacts table:', err);
  });

  module.exports = {
    createContact: async (name, email, phone) => {
      const id = uuidv4();
      const query = `
        INSERT INTO contacts (id, name, email, phone)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `;
    
      try {
        const result = await db.query(query, [id, name, email, phone]);
        return result.rows[0];
      } catch (err) {
        throw err;
      }
    },

  getAllContacts: async () => {
    const query = `
      SELECT * FROM contacts
    `;

    try {
      const result = await db.query(query);
      return result.rows;
    } catch (err) {
      throw err;
    }
  },

  getContactById: async (id) => {
    const query = `
      SELECT * FROM contacts
      WHERE id = $1
    `;

    try {
      const result = await db.query(query, [id]);
      return result.rows[0];
    } catch (err) {
      throw err;
    }
  },

  updateContact: async (id, name, email, phone) => {
    const query = `
      UPDATE contacts
      SET name = $2, email = $3, phone = $4, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING *
    `;

    try {
      const result = await db.query(query, [id, name, email, phone]);
      return result.rows[0];
    } catch (err) {
      throw err;
    }
  },

  deleteContact: async (id) => {
    const deleteQuery = `
      DELETE FROM contacts
      WHERE id = $1
      RETURNING *
    `;

    try {
      const result = await db.query(deleteQuery, [id]);
      return result.rows[0];
    } catch (err) {
      throw err;
    }
  },
};
