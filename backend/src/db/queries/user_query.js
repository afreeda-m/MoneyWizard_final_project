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
  addNewUser
};