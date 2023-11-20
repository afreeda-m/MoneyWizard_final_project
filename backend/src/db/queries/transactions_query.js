const db = require('../connection.js');

//show all transactions in DB for a user
const getTransactionsByUserId = (userId) => {
  const queryString = `SELECT * FROM transactions WHERE user_id = $1 ORDER BY transaction_date DESC;`;

  return db
  .query(queryString, [userId])
  .then((data) => {
    return data.rows
  })
  .catch((error) => {
    console.log("Unable to get transactions by user_id", error);
  });
  //filter by date, initially show transactions for current month, all transactions
};

const addTransactions = (userId, transactionData) => {
  const insertTransaction = `
    INSERT INTO transactions(user_id, category_id, account_id, amount, transaction_date, notes)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING category_id, amount, account_id;`;

  const updateBalance = `
    UPDATE accounts
    SET balance =
      CASE
        WHEN (SELECT type FROM categories WHERE id = $1) = 'Income' THEN balance + $2
        WHEN (SELECT type FROM categories WHERE id = $1) = 'Expense' THEN balance - $2
      END
    WHERE id = $3;`;

  return db
    .query("begin")
    .then((res) => {
    return db.query (insertTransaction, [
        userId,
        transactionData.categoryId,
        transactionData.accountId,
        transactionData.amount,
        transactionData.transaction_date,
        transactionData.notes,
      ]);
    })
    .then((result) => {
      const categoryId = result.rows[0].category_id;
      const amount = result.rows[0].amount;
      const accountId = result.rows[0].account_id;

      return db.query(updateBalance, [categoryId, amount, accountId]);
    })
    .then(() => {
      return db.query("commit");
    })
    .then((data) => {
      console.log('Transaction added to DB');
      return data.rowCount;
    })
    .catch((error) => {
      console.log('Error in adding transaction to DB', error);
      return db.query("rollback");
    })
    .catch((err) => {
      console.error("Error while rolling back transaction:", err);
    });
};


const deleteTransaction = (transactionId) => {
  const deleteTransaction = `DELETE FROM transactions WHERE id = $1 RETURNING category_id, amount, account_id;`

  const updateBalance = `
  UPDATE accounts
  SET balance =
    CASE
      WHEN (SELECT type FROM categories WHERE id = $1) = 'Income' THEN balance - $2
      WHEN (SELECT type FROM categories WHERE id = $1) = 'Expense' THEN balance + $2
    END
  WHERE id = $3;`

  return db
  .query("begin")
  .then((res) => {
    return db.query(deleteTransaction, [transactionId])
  })
  .then((res) => {
    categoryId = res.rows[0].category_id
    amount = res.rows[0].amount
    accountId = res.rows[0].account_id

    return db.query(updateBalance, [categoryId, amount, accountId])
  })
  .then((res) => {
    return db.query("commit");
  })
  .then((data) => {
    console.log('Transaction successfully deleted from DB')
    return data.rowCount
  })
  .catch((error) => {
    console.log('Error in deleting transactions from DB', error)
    return db.query("rollback")
  })
  .catch((err) => {
    console.error("error while rolling back transaction:", err)
  })
}

const editTransaction = (transactionData) => {
  const queryString = `UPDATE transactions SET category_id = $1, account_id = $2, amount = $3, transaction_date = $4, notes = $5 where id = $6;`

  return db
    .query(queryString, [transactionData.categoryId, transactionData.accountId, transactionData.amount, transactionData.transaction_date, transactionData.notes, transactionData.transaction_id])
    .then((transaction) => {
      console.log("Transaction successfully edited")
      return transaction.rowCount
    })
    .catch((error) => {
      console.log('Error editing transaction', error)
    })
}

const getTransactionsByCategoryId = (userId, year, month) => {
  let queryString = `SELECT type, category_name, sum(amount) from transactions JOIN  categories ON categories.id = category_id WHERE transactions.user_Id = $1 {date_filter} GROUP BY type, category_name;`

  let queryParams = [userId];

  let filterString = ""
  if (year) {
    filterString = "AND EXTRACT(year from transaction_date) = $2 AND EXTRACT(MONTH from transaction_date) = $3"
    queryParams.push(year, month);
  }

  queryString = queryString.replace("{date_filter}", filterString);

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

//updateTransfer?



module.exports = {
  getTransactionsByUserId,
  addTransactions,
  deleteTransaction,
  editTransaction,
  getTransactionsByCategoryId
};