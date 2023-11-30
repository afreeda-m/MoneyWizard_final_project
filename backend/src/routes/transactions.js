const express = require('express');
const router = express.Router();
const transactionsQueries = require('../db/queries/transactions_query.js');

router.get('/', (req, res) => {
  const userId = 1; //will need to extract this from cookies (set cookie session at initial login then extract the user_id every time)
  const year = req.query.year;
  const month = req.query.month;

  transactionsQueries.getTransactionsByUserId(userId, year, month)
    .then(transactions => res.json(transactions))
    .catch(error => {
      console.error('Error fetching transactions:', error);
      res.status(500).send('Internal Server Error');
    });
});

router.post('/add', (req, res) => {
  const userId = 1;
  const transactionData = {
    categoryId: req.body.post.categoryId,
    accountId: req.body.post.accountId,
    amount: req.body.post.amount,
    transaction_date: req.body.post.transaction_date,
    notes: req.body.post.notes
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

router.post('/edit', (req, res) => {
  const transactionData = {
    categoryId: req.body.categoryId,
    accountId: req.body.accountId,
    amount: req.body.amount,
    transaction_date: req.body.transaction_date,
    notes: req.body.notes,
    transaction_id: req.body.transaction_id
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

router.get('/transactionsByCategory', (req, res) => {
  const userId = 1;
  const date = req.query.date;

  let year = null;
  let month = null;
  if (date) {
    split = date.split("-");
    year = parseInt(split[0]);
    month = parseInt(split[1]);
  }

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