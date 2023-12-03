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

//show 6months ago transactions for a user based on month and year, default is current month and year
const getTransactionsByMonth = (userId, year = null, month = null) => {
  let queryString = `SELECT * FROM transactions WHERE user_id = $1 {date_filter} ORDER BY transaction_date;`;

  let queryParams = [userId];

   // Initialize endDate to the current date
   let endDate = new Date();

   // Check if year and month are provided, and if so, set endDate to the last day of the specified month
   if (year != null && month != null) {
     endDate = new Date(year, month);
   }

   // Format the endDate to ISO format and extract the date part
   let endDateString = endDate.toISOString().split('T')[0];

   // Create a new Date object based on endDate to calculate the start date (6 months ago)
   let startDateString = new Date(endDate);
   startDateString.setMonth(endDate.getMonth() - 6);

   // Format the startDateString to ISO format and extract the date part
   startDateString = startDateString.toISOString().split('T')[0];

   // Construct the filterString for the date range using the BETWEEN operator in the SQL query
   let filterString = `AND transaction_date BETWEEN $2 AND $3`;

   // Add start and end date parameters to the queryParams array
   queryParams.push(startDateString, endDateString);

   // Replace the {date_filter} placeholder in the queryString with the constructed filterString
   queryString = queryString.replace("{date_filter}", filterString);


  return db
    .query(queryString, queryParams)
    .then((data) => {
      return data.rows;
    })
    .catch((error) => {
      console.log("Unable to get transactions by month", error);
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

//Remove a transaction or transfer from DB and update account balance
const deleteTransaction = (transactionId) => {
  const deleteTransactionQuery = `
    DELETE FROM transactions
    WHERE id = $1
    RETURNING category_id, amount, account_id, account_id_to;
  `;

  const updateBalanceQuery = `
    UPDATE accounts
    SET balance =
      CASE
        WHEN (SELECT type FROM categories WHERE id = $1) = 'Income' THEN balance - $2
        WHEN (SELECT type FROM categories WHERE id = $1) = 'Expense' THEN balance + $2
      END
    WHERE id = $3;
  `;

  const updateTransferBalanceQuery = `
    UPDATE accounts
    SET balance = balance + $1
    WHERE id = $2;
  `;

  return db
    .query("begin")
    .then(() => {
      return db.query(deleteTransactionQuery, [transactionId]);
    })
    .then((result) => {
      const { category_id, amount, account_id, account_id_to } = result.rows[0];

      // Retrieve the category type dynamically
      return db.query('SELECT type FROM categories WHERE id = $1', [category_id])
        .then((categoryResult) => {
          const categoryType = categoryResult.rows[0].type;

          if (categoryType === 'Transfer') {
            // Handle Transfer type transaction
            return Promise.all([
              db.query(updateTransferBalanceQuery, [amount, account_id]),
              db.query(updateTransferBalanceQuery, [-amount, account_id_to]),
            ]);
          } else {
            // Handle other types (Income/Expense) transactions
            return db.query(updateBalanceQuery, [category_id, amount, account_id]);
          }
        });
    })
    .then(() => {
      return db.query("commit");
    })
    .then((data) => {
      console.log('Transaction successfully deleted from DB');
      return data.rowCount;
    })
    .catch((error) => {
      console.log('Error deleting transactions from DB', error);
      return db.query("rollback");
    })
    .catch((err) => {
      console.error("Error while rolling back transaction:", err);
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

//Update an existing transaction in DB
const editTransaction = (transactionData) => {
  const getPreviousAmountQuery = `SELECT amount, account_id FROM transactions WHERE id = $1;`;

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

  const updatePreviousAccountBalance = `
  UPDATE accounts
    SET balance =
      CASE
        WHEN (SELECT type FROM categories WHERE id = $1) = 'Income' THEN balance - $3
        WHEN (SELECT type FROM categories WHERE id = $1) = 'Expense' THEN balance + $3
      END
    WHERE id = $2
    RETURNING balance;
  `

  const updateNewAccountBalanceQuery = `
    UPDATE accounts
    SET balance =
      CASE
        WHEN (SELECT type FROM categories WHERE id = $1) = 'Income' THEN balance + $3
        WHEN (SELECT type FROM categories WHERE id = $1) = 'Expense' THEN balance - $3
      END
    WHERE id = $2;
  `;

  let previousAmount;
  let previousAccount;

  return db
    .query("begin")
    .then(() => {
      // Get the previous amount
      return db.query(getPreviousAmountQuery, [transactionData.transaction_id]);
    })
    .then((previousAmountResult) => {
      previousAmount = previousAmountResult.rows[0].amount;
      previousAccount = previousAmountResult.rows[0].account_id;

      return db.query(updatePreviousAccountBalance, [
        transactionData.categoryId,
        previousAccount,
        previousAmount
     ]);
    })
    .then(() => {
      // Execute the update query for the account balance
      return db.query(updateNewAccountBalanceQuery, [
        transactionData.categoryId,
        transactionData.accountId,
        transactionData.amount
      ]);
    })
    .then(() => {
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
  let queryString = `SELECT type, category_id, category_name, sum(amount) FROM transactions JOIN categories ON categories.id = category_id WHERE transactions.user_Id = $1 {date_filter} GROUP BY type, category_name, category_id;`;

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


module.exports = {
  getTransactionsByUserId,
  addTransaction,
  deleteTransaction,
  getTransactionById,
  editTransaction,
  getTransactionsByCategoryId,
  getTransactionsByMonth
};