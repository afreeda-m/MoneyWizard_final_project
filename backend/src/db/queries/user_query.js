const db = require('../connection.js');

// Add this function to check user credentials
const checkUserCredentials = (email) => {
  const query = 'SELECT * FROM users WHERE email = $1';

  return db
    .query(query, [email])
    .then((result) => {
      return result.rows[0];
    });
};

module.exports = {
  checkUserCredentials
};