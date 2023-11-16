const db = require('../connection.js');

const getTransactionsByUserId = (userId) => {
  const queryString = `SELECT * FROM transactions WHERE user_id = $1;`
  return db
    .query(queryString, [userId])
    .then((data) => {
      return data.rows
    })
    .catch((error) => {
      console.log("Unable to get transactions by user_id", error);
    })
}

module.exports = {getTransactionsByUserId};