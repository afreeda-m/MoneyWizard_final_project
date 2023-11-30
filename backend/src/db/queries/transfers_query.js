const db = require('../connection.js');

//Add a transfer to DB and update the balance in both accounts
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

//Update an existing transfer in DB
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
      // Get the previous transfer amount and account IDs
      return db.query(getPreviousTransferAmountQuery, [transferData.transactionId]);
    })
    .then((previousTransferResult) => {
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
  addTransfer,
  editTransfer
};