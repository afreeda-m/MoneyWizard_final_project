const db = require('../connection.js');

// Add this function to check user credentials
const checkUserCredentials = (email) => {
  const query = 'SELECT * FROM users WHERE email = $1';

  return db
    .query(query, [email])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.error("Error checking users:", err);
    });
};

// Add this function to check user credentials
const getUserById = (user_id) => {
  const query = 'SELECT * FROM users WHERE id = $1';

  return db
    .query(query, [user_id])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.error("Error checking users by id:", err);
    });
};

const addNewUser = (email, name, password) => {
  const query =  `INSERT INTO users (email, name, password) VALUES ($1, $2, $3) RETURNING id;`

  return db
    .query(query, [email, name, password])
    .then((result) => {
      return result.rows[0].id
    })
    .catch((err) => {
      console.error("Error adding user:", err);
    });
}

module.exports = {
  checkUserCredentials,
  addNewUser,
  getUserById
};