const db = require('../connection.js');

//get categories by user's ID
const getAccountsByUserId = (userId) => {
  const queryString = `SELECT * FROM accounts WHERE user_id = $1;`
  return db
    .query(queryString, [userId])
    .then((data) => {
      return data.rows
    })
    .catch((error) => {
      console.log("Unable to get Accounts by user_id", error);
    })
}


module.exports = {getAccountsByUserId}