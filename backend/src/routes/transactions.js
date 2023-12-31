const express = require('express');
const router = express.Router();
const transactionsQueries = require('../db/queries/transactions_query.js');

//get all transactions for a user by month and year (default current month/year)
router.get('/', (req, res) => {
  const userId = 1;
  // const userId = req.session.user_id;
  const year = req.query.year;
  const month = req.query.month;

  transactionsQueries.getTransactionsByUserId(userId, year, month)
    .then(transactions => res.json(transactions))
    .catch(error => {
      console.error('Error fetching transactions:', error);
      res.status(500).send('Internal Server Error');
    });
});

router.get('/monthlyTransactions', (req, res) => {
  const userId = 1; //will need to extract this from cookies (set cookie session at initial login then extract the user_id every time)
  const year = req.query.year;
  const month = req.query.month;

  transactionsQueries.getTransactionsByMonth(userId, year, month)
    .then(transactions => res.json(transactions))
    .catch(error => {
      console.error('Error fetching transactions:', error);
      res.status(500).send('Internal Server Error');
    });
});


// Add a new transaction to the DB
router.post('/add', (req, res) => {
  const userId = 1;
  // const userId = req.session.user_id;
  const transactionData = {
    categoryId: req.body.categoryId,
    accountId: req.body.accountId,
    amount: parseFloat(req.body.amount),
    transaction_date: req.body.transaction_date,
    notes: req.body.notes
  };

  transactionsQueries.addTransaction(userId, transactionData)
    .then(() => {
      res.redirect('/transactions');
    })
    .catch((error) => {
      console.log('Error in adding transaction to DB', error);
      res.status(500).send('Internal Server Error');
    });
});

//Delete a transaction OR a transfer from DB
router.post('/:transaction_id/delete', (req, res) => {
  const transactionId = req.params.transaction_id;

  transactionsQueries.deleteTransaction(transactionId)
    .then(() => {
      res.redirect('/transactions');
    })
    .catch((error) => {
      console.log('Error deleting transaction in DB', error);
      res.status(500).send('Internal Server Error');
    });
});

//Get transaction information from DB to auto-fill edit modal
router.get('/edit', (req, res) => {
  const transactionId = req.query.transaction_id;

  transactionsQueries.getTransactionById(transactionId)
    .then((transaction) => {
      res.json(transaction);
    })
    .catch((error) => {
      console.log('Error deleting transaction in DB', error);
      res.status(500).send('Internal Server Error');
    });
});

//Update the DB with new transaction information
router.post('/:transaction_id/edit', (req, res) => {
  const transactionData = {
    categoryId: req.body.categoryId,
    accountId: req.body.accountId,
    amount: parseFloat(req.body.amount),
    transaction_date: req.body.transaction_date,
    notes: req.body.notes,
    transaction_id: req.params.transaction_id
  };

  transactionsQueries.editTransaction(transactionData)
    .then(() => {
      res.redirect('/transactions');
    })
    .catch((error) => {
      console.log('Error in editing transaction in DB', error);
      res.status(500).send('Internal Server Error');
    });
});

//Get sum of all transactions based on category (for reports page)
router.get('/transactionsByCategory', (req, res) => {
  const userId = 1;
  // const userId = req.session.user_id;

  const year = req.query.year;
  const month = req.query.month;

  // const date = req.query.date;
  // let year = null;
  // let month = null;
  // if (date) {
  //   split = date.split("-");
  //   year = parseInt(split[0]);
  //   month = parseInt(split[1]);
  // }

  transactionsQueries.getTransactionsByCategoryId(userId, year, month)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log('Error in fetching transactions by category', error);
      res.status(500).send('Internal Server Error');
    });
});

module.exports = router;