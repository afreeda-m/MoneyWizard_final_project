const db = require('../connection.js');

//show transactions in DB for a user based on month and year
const getTransactionsByUserId = (userId, year = null, month = null) => {
  let queryString = `SELECT * FROM transactions WHERE user_id = $1 {date_filter} ORDER BY transaction_date DESC;`;

  let queryParams = [userId];

  let filterString = "";

  if (year && month) {
    filterString = "AND EXTRACT(year FROM transaction_date) = $2 AND EXTRACT(month FROM transaction_date) = $3";
    queryParams.push(year, month);
  } else {
    // Use the current month and year if not provided
    const currentDate = new Date();
    queryParams.push(currentDate.getFullYear(), currentDate.getMonth() + 1);
    filterString = "AND EXTRACT(year FROM transaction_date) = $2 AND EXTRACT(month FROM transaction_date) = $3";
  }

  queryString = queryString.replace("{date_filter}", filterString);

  return db
    .query(queryString, queryParams)
    .then((data) => {
      return data.rows;
    })
    .catch((error) => {
      console.log("Unable to get transactions by user_id", error);
    });
};


//Add new transaction to DB and update balance in respective accounts
const addTransaction = (userId, transactionData) => {
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

  //group both above queries
  return db
    .query("begin")
    .then((res) => {
      return db.query(insertTransaction, [
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

//remove a transaction from DB and update balance in respectice accounts
const deleteTransaction = (transactionId) => {
  const deleteTransaction = `DELETE FROM transactions WHERE id = $1 RETURNING category_id, amount, account_id;`;

  const updateBalance = `
  UPDATE accounts
  SET balance =
    CASE
      WHEN (SELECT type FROM categories WHERE id = $1) = 'Income' THEN balance - $2
      WHEN (SELECT type FROM categories WHERE id = $1) = 'Expense' THEN balance + $2
    END
  WHERE id = $3;`;

  return db
    .query("begin")
    .then((res) => {
      return db.query(deleteTransaction, [transactionId]);
    })
    .then((res) => {
      categoryId = res.rows[0].category_id;
      amount = res.rows[0].amount;
      accountId = res.rows[0].account_id;

      return db.query(updateBalance, [categoryId, amount, accountId]);
    })
    .then((res) => {
      return db.query("commit");
    })
    .then((data) => {
      console.log('Transaction successfully deleted from DB');
      return data.rowCount;
    })
    .catch((error) => {
      console.log('Error in deleting transactions from DB', error);
      return db.query("rollback");
    })
    .catch((err) => {
      console.error("error while rolling back transaction:", err);
    });
};

const getTransactionById = (transactionId) => {
  const queryString = `SELECT * FROM transactions WHERE id = $1;`;

  return db
    .query(queryString, [transactionId])
    .then((transaction) => {
      return transaction.rows
    })
    .catch((error) => {
      console.log('Error getting transactions by id', error);
    });

};

const editTransaction = (transactionData) => {
  const queryString = `UPDATE transactions SET category_id = $1, account_id = $2, amount = $3, transaction_date = $4, notes = $5 where id = $6;`;

  return db
    .query(queryString, [transactionData.categoryId, transactionData.accountId, transactionData.amount, transactionData.transaction_date, transactionData.notes, transactionData.transaction_id])
    .then((transaction) => {
      console.log("Transaction successfully edited");
      return transaction.rowCount;
    })
    .catch((error) => {
      console.log('Error editing transaction', error);
    });
};

//Show the sum of transactions by category for a given month/year timeframe
const getTransactionsByCategoryId = (userId, year = null, month = null) => {
  // {date_filter} is a placeholder depending on date being passed in
  let queryString = `SELECT type, category_name, sum(amount) FROM transactions JOIN categories ON categories.id = category_id WHERE transactions.user_Id = $1 {date_filter} GROUP BY type, category_name;`

  let queryParams = [userId];

  let filterString = "";

  if (year && month) {
    filterString = "AND EXTRACT(year FROM transaction_date) = $2 AND EXTRACT(month FROM transaction_date) = $3";
    queryParams.push(year, month);
  } else {
    // Use the current month and year if not provided
    const currentDate = new Date();
    queryParams.push(currentDate.getFullYear(), currentDate.getMonth() + 1);
    filterString = "AND EXTRACT(year FROM transaction_date) = $2 AND EXTRACT(month FROM transaction_date) = $3";
  }

  queryString = queryString.replace("{date_filter}", filterString);

  return db
    .query(queryString, queryParams)
    .then((data) => {
      return data.rows;
    })
    .catch((error) => {
      console.log('Error getting transactions by category', error);
    });
}


//getTransactionsByDate

//updateTransfer?



module.exports = {
  getTransactionsByUserId,
  addTransaction,
  deleteTransaction,
  editTransaction,
  getTransactionsByCategoryId,
  getTransactionById
};