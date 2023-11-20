const db = require('../connection.js');

const getTransactionsByUserId = (userId) => {
  const queryString = `SELECT * FROM transactions WHERE user_id = $1 ORDER BY transaction_date DESC;`
  return db
    .query(queryString, [userId])
    .then((data) => {
      return data.rows
    })
    .catch((error) => {
      console.log("Unable to get transactions by user_id", error);
    })
}

const addTransactions = (userId, transactionData) => {
    const insertTransaction = `INSERT INTO transactions(user_id,category_id, account_id, amount, transaction_date, notes) VALUES($1, $2, $3, $4, $5, $6);`

    const updateBalance = `UPDATE accounts SET balance = balance - $1 where id = $2;`

    return db
    .query("begin")
    .then((res) => {
      return db.query(insertTransaction, [userId, transactionData.categoryId, transactionData.accountId, transactionData.amount,transactionData.transaction_date, transactionData.notes])
    })
    .then((res) => {
      return db.query(updateBalance, [transactionData.amount, userId])
    })
    .then((res) => {
      return db.query("commit");
    })
    .then((data) => {
      console.log('Transaction added to DB')
      return data.rowCount
    })
    .catch((error) => {
      console.log('Error in adding transactions to DB', error)
      return db.query("rollback")
    })
    .catch((err) => {
      console.error("error while rolling back transaction:", err)
    })
}

const deleteTransaction = (transactionId) => {
  const deleteTransaction = `DELETE FROM transactions WHERE id = $1 RETURNING amount, account_id;`

  const updateBalance = `UPDATE accounts SET balance = balance + $1 where id = $2;`

  return db
  .query("begin")
  .then((res) => {
    return db.query(deleteTransaction, [transactionId])
  })
  .then((res) => {
    amount = res.rows[0].amount
    account_id = res.rows[0].account_id

    console.log(amount)
    console.log(account_id);
    return db.query(updateBalance, [amount, account_id])
  })
  .then((res) => {
    return db.query("commit");
  })
  .then((data) => {
    console.log('Transaction added to DB')
    return data.rowCount
  })
  .catch((error) => {
    console.log('Error in adding transactions to DB', error)
    return db.query("rollback")
  })
  .catch((err) => {
    console.error("error while rolling back transaction:", err)
  })
}


const editTransaction = (transactionData) => {
  const queryString = `UPDATE transactions SET category_id = $1, account_id = $2, amount = $3, transaction_date = $4, notes = $5 where id = $6;`
  console.log(transactionData);
  return db
    .query(queryString, [transactionData.categoryId, transactionData.accountId, transactionData.amount, transactionData.transaction_date, transactionData.notes, transactionData.transaction_id])
    .then((transaction) => {
      console.log("Transaction successfully edited")
      console.log(transaction);
      return transaction.rowCount
    })
    .catch((error) => {
      console.log('Error editing transaction', error)
    })
}

const getTransactionsByCategoryId = (userId, year, month) => {
  let queryString = `SELECT type, category_name, sum(amount) from transactions JOIN  categories ON categories.id = category_id WHERE transactions.user_Id = $1 {date_filter} GROUP BY type, category_name;`

  let queryParams = [userId];

  console.log(typeof year);
  console.log(typeof month);

  let filterString = ""
  if (year) {
    filterString = "AND EXTRACT(year from transaction_date) = $2 AND EXTRACT(MONTH from transaction_date) = $3"
    queryParams.push(year, month);
  }

  queryString = queryString.replace("{date_filter}", filterString);
  console.log(queryString);

  return db
    .query(queryString, queryParams)
    .then((data) => {
      return data.rows
    })
    .catch((error) => {
      console.log('Error getting transactions by category', error)
    })
}



//getTransactionsByDate


module.exports = {
  getTransactionsByUserId,
  addTransactions,
  deleteTransaction,
  editTransaction,
  getTransactionsByCategoryId
};