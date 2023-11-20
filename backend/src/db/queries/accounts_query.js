const db = require('../connection.js');

//get accounts by user's ID
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

// get accounts by their ID
const getAccountsById = (accountId) => {
  const queryString = `SELECT * FROM accounts WHERE id = $1;`;

  return db
    .query(queryString, [accountId])
    .then((data) => {
      return data.rows[0];
    })
    .catch((error) => {
      console.error('Error fetching account by ID:', error);
      throw error;
    });
};


//Add new account
const addAccount = (accountData, userId) => {
  const queryString = `
    INSERT INTO accounts (account_name, balance, note, user_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *;`; // Use RETURNING * to get the inserted row

  return db
    .query(queryString, [accountData.account_name, accountData.balance, accountData.note, userId])
    .then((data) => {
      return data.rows[0]; // only one row to be inserted
    })
    .catch((error) => {
      console.error("Unable to add new account", error);
      throw error;
    });
};

// Update Existing Account
const updateAccount = (accountId, accountData, userId) => {
  // Check if the account exists before updating
  return getAccountsById(accountId)
    .then(existingAccount => {
      if (!existingAccount) {
        throw new Error('Account not found');
      }

      // If the Account exists, proceed with the update
      const queryString = `
        UPDATE accounts
        SET account_name = $1, balance = $2, note = $3
        WHERE id = $4 AND user_id = $5
        RETURNING *;`;

      return db.query(queryString, [
        accountData.account_name,
        accountData.balance,
        accountData.note,
        accountId,
        userId
      ]);
    })
    .then(data => {
      return data.rows[0]; //only one updated row
    })
    .catch(error => {
      console.error("Unable to update an account data", error);
      throw error;
    });
};



const removeAccount =(account_id, userId) =>{

  const queryString = `DELETE FROM accounts WHERE id = $1 AND user_id = $2;`;
  return db
    .query(queryString, [account_id, userId])
    .then((data) => {
      return data.rows;
    })
    .catch((error) => {
      console.log('Unable to remove an account', error);
    });
};

module.exports = {

  getAccountsByUserId,
  getAccountsById,
  addAccount,
  updateAccount,
  removeAccount,

};