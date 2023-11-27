const db = require('../connection.js');

//show transactions in DB for a user based on month and year, default is current month and year
const getTransactionsByUserId = (userId, year = null, month = null) => {
  let queryString = `SELECT * FROM transactions WHERE user_id = $1 {date_filter} ORDER BY transaction_date DESC;`;

  let queryParams = [userId];

  if (year == null && month == null) {
    const currentDate = new Date();
    year = currentDate.getFullYear();
    month = currentDate.getMonth() + 1;
  }

  let filterString = "";

  filterString = "AND EXTRACT(year FROM transaction_date) = $2 AND EXTRACT(month FROM transaction_date) = $3";
  queryParams.push(year, month);

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
      const categoryId = res.rows[0].category_id;
      const amount = res.rows[0].amount;
      const accountId = res.rows[0].account_id;

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


//To show the transaction information for pre-filled modal for editing
const getTransactionById = (transactionId) => {
  const queryString = `SELECT * FROM transactions WHERE id = $1;`;

  return db
    .query(queryString, [transactionId])
    .then((transaction) => {
      return transaction.rows;
    })
    .catch((error) => {
      console.log('Error getting transactions by id', error);
    });
};


const editTransaction = (transactionData) => {
  const getPreviousAmountQuery = `SELECT amount FROM transactions WHERE id = $1;`;

  const updateTransactionQuery = `
    UPDATE transactions
    SET
      category_id = $2,
      account_id = $3,
      amount = $4,
      transaction_date = $5,
      notes = $6
    WHERE
      id = $1;
  `;

  const updateBalanceQuery = `
    UPDATE accounts
    SET balance =
      CASE
        WHEN (SELECT type FROM categories WHERE id = $1) = 'Income' THEN balance - $4 + $3
        WHEN (SELECT type FROM categories WHERE id = $1) = 'Expense' THEN balance + $4 - $3
      END
    WHERE id = $2;
  `;

  let previousAmount;

  return db
    .query("begin")
    .then(() => {
      // Get the previous amount
      return db.query(getPreviousAmountQuery, [transactionData.transaction_id]);
    })
    .then((previousAmountResult) => {
      previousAmount = previousAmountResult.rows[0].amount;

      // Execute the update query for the transaction
      return db.query(updateTransactionQuery, [
        transactionData.transaction_id,
        transactionData.categoryId,
        transactionData.accountId,
        transactionData.amount,
        transactionData.transaction_date,
        transactionData.notes
      ]);
    })
    .then(() => {
      // Execute the update query for the account balance
      return db.query(updateBalanceQuery, [
        transactionData.categoryId,
        transactionData.accountId,
        transactionData.amount,
        previousAmount
      ]);
    })
    .then(() => {
      return db.query("commit");
    })
    .then((data) => {
      console.log('Transaction successfully edited');
      return data.rowCount;
    })
    .catch((error) => {
      console.log('Error editing transaction in DB', error);
      return db.query("rollback");
    })
    .catch((err) => {
      console.error("Error while rolling back transaction:", err);
    });
};


//Show the sum of transactions by category for a given month/year timeframe
const getTransactionsByCategoryId = (userId, year = null, month = null) => {
  // {date_filter} is a placeholder depending on date being passed in
  let queryString = `SELECT type, category_name, sum(amount) FROM transactions JOIN categories ON categories.id = category_id WHERE transactions.user_Id = $1 {date_filter} GROUP BY type, category_name;`;

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
};

//Add a transfer to the transactions table and update the balance in both accounts
const addTransfer = (transfer) => {
  const createTransaction = `
    INSERT INTO transactions(user_id, category_id, account_id, account_id_to, amount, transaction_date, notes)
    VALUES ($1, $2, $3, $4, $5, $6, $7);`
  const fundsFrom = `UPDATE accounts SET balance = balance - $1 WHERE id= $2;`;
  const fundsTo = `UPDATE accounts SET balance = balance + $1 WHERE id = $2;`;

  return db
  .query("begin")
  .then((res) => {
    return db.query(fundsFrom, [transfer.amount, transfer.accountFrom]);
  })
  .then((res) => {
    return db.query(fundsTo, [transfer.amount, transfer.accountTo]);
  })
  .then((res) => {
    return db.query(createTransaction, [
      transfer.userId,
      transfer.categoryId,
      transfer.accountFrom,
      transfer.accountTo,
      transfer.amount,
      transfer.transaction_date,
      transfer.notes,
    ]);
  })
  .then((res) => {
    return db.query("commit");
  })
  .then((data) => {
    console.log('Added a transfer');
    return data.rowCount;
  })
  .catch((error) => {
    console.log('Error in adding transfer to DB', error);
    return db.query("rollback");
  })
  .catch((err) => {
    console.error("error while rolling back transfer:", err);
  });
}


const editTransfer = (transferData) => {
  const getPreviousTransferAmountQuery = `SELECT amount, account_id, account_id_to FROM transactions WHERE id = $1;`;

  const updateTransferQuery = `
    UPDATE transactions
    SET
      category_id = $2,
      account_id = $3,
      account_id_to = $4,
      amount = $5,
      transaction_date = $6,
      notes = $7
    WHERE
      id = $1;
  `;

  const updateBalanceFromQuery = `
    UPDATE accounts
    SET balance = balance + $1
    WHERE id = $2;
  `;

  const updateBalanceToQuery = `
    UPDATE accounts
    SET balance = balance - $1
    WHERE id = $2;
  `;

  let previousTransferAmount;
  let previousAccountId;
  let previousAccountIdTo;

  return db
    .query("begin")
    .then(() => {
      console.log(transferData)
      // Get the previous transfer amount and account IDs
      return db.query(getPreviousTransferAmountQuery, [transferData.transactionId]);
    })
    .then((previousTransferResult) => {
      console.log(previousTransferAmount)
      previousTransferAmount = previousTransferResult.rows[0].amount;
      previousAccountId = previousTransferResult.rows[0].account_id;
      previousAccountIdTo = previousTransferResult.rows[0].account_id_to;

      // Execute the update query for the transfer
      return db.query(updateTransferQuery, [
        transferData.transactionId,
        transferData.categoryId,
        transferData.accountFrom,
        transferData.accountTo,
        transferData.amount,
        transferData.transaction_date,
        transferData.notes,
      ]);
    })
    .then(() => {
      // Execute the update query for the source account balance
      return db.query(updateBalanceFromQuery, [previousTransferAmount, previousAccountId]);
    })
    .then(() => {
      // Execute the update query for the destination account balance
      return db.query(updateBalanceToQuery, [previousTransferAmount, previousAccountIdTo]);
    })
    .then(() => {
      return db.query("commit");
    })
    .then((data) => {
      console.log('Transfer successfully edited');
      return data.rowCount;
    })
    .catch((error) => {
      console.log('Error editing transfer in DB', error);
      return db.query("rollback");
    })
    .catch((err) => {
      console.error("Error while rolling back transfer:", err);
    });
};


module.exports = {
  getTransactionsByUserId,
  addTransaction,
  deleteTransaction,
  getTransactionById,
  editTransaction,
  getTransactionsByCategoryId,
  addTransfer,
  editTransfer
};