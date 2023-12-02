const express = require('express');
const router = express.Router();
const transfersQueries = require('../db/queries/transfers_query.js')

//Add new transfer to the DB
router.post('/add', (req, res) => {
  const transferData = {
    userId: 1, //req.session.user_id;
    categoryId: req.body.categoryId,
    accountId: req.body.accountId,
    accountToId: req.body.accountToId,
    amount: req.body.amount,
    transaction_date: req.body.transaction_date,
    notes: req.body.notes
  }

  transfersQueries.addTransfer(transferData)
  .then(() => {
    res.redirect('/transactions')
  })
  .catch((error) => {
    console.log('Error in adding transfer to DB', error);
    res.status(500).send('Internal Server Error');
  })
})

//Update an existing transfer in DB
router.post('/:transaction_id/edit', (req, res) => {
  const transferData = {
    transactionId: req.params.transaction_id,
    userId: req.body.userId, //req.session.user_id;
    categoryId: req.body.categoryId,
    accountId: req.body.accountId,
    accountToId: req.body.accountToId,
    amount: req.body.amount,
    transaction_date: req.body.transaction_date,
    notes: req.body.notes
  }

  transfersQueries.editTransfer(transferData)
  .then(() => {
    res.redirect('/transactions')
  })
  .catch((error) => {
    console.log('Error in editing transfer in DB', error);
    res.status(500).send('Internal Server Error');
  })
})

module.exports = router;